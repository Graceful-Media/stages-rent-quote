
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { validateQuoteRequest } from "./utils/validation.ts";
import { generateQuoteEmailHtml } from "./utils/emailTemplates.ts";
import { checkRateLimit, updateRateLimit } from "./utils/rateLimiting.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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
    const quoteData = await req.json();
    validateQuoteRequest(quoteData);

    // Check rate limit
    const clientIp = req.headers.get("x-real-ip") || "unknown";
    const { isLimited, currentCount, lastReset } = await checkRateLimit(clientIp);
    
    if (isLimited) {
      throw new Error("Rate limit exceeded");
    }

    const html = await generateQuoteEmailHtml(quoteData);

    const emailResponse = await resend.emails.send({
      from: "Stage Rentals <mail@quotes.proavsource.com>",
      to: [quoteData.recipientEmail],
      subject: `Stage Rental Quote - ${quoteData.recipientName}`,
      html,
    });

    // Update rate limit counter
    await updateRateLimit(clientIp, currentCount, lastReset);

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-quote-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: error.message === "Rate limit exceeded" ? 429 : 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
