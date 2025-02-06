import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";
import { checkRateLimit, updateRateLimit } from "./utils/rateLimiting.ts";
import { validateQuoteRequest, QuoteEmailRequest } from "./utils/validation.ts";
import { generateQuoteEmailHtml } from "./utils/emailTemplates.ts";
import { saveQuoteToDatabase } from "./utils/database.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const rateLimitWindowMs = 3600000; // 1 hour
const maxRequestsPerWindow = 5; // 5 requests per hour per IP

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    console.log("Request from IP:", clientIp);

    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check rate limit
    const { isLimited, currentCount, lastReset } = await checkRateLimit(
      supabaseAdmin,
      clientIp,
      maxRequestsPerWindow,
      rateLimitWindowMs
    );

    if (isLimited) {
      console.log("Rate limit exceeded for IP:", clientIp);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Parse and validate request
    const quoteData: QuoteEmailRequest = await req.json();
    validateQuoteRequest(quoteData);

    // Update rate limit
    await updateRateLimit(supabaseAdmin, clientIp, currentCount, lastReset);

    // Save quote to database
    await saveQuoteToDatabase(supabaseAdmin, quoteData);

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Stage Rentals <mail@quotes.proavsource.com>",
      to: [quoteData.recipientEmail],
      subject: "Your Stage Rental Quote",
      html: generateQuoteEmailHtml(quoteData),
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);