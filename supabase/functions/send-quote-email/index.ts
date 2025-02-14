
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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData = await req.json();
    console.log("Received quote request data:", requestData);

    // Ensure the required numeric values exist and are numbers
    const quoteData = {
      ...requestData,
      totalCost: Number(requestData.totalCost) || 0,
      dailyCosts: Number(requestData.dailyCosts) || 0,
      oneTimetCosts: Number(requestData.oneTimetCosts) || 0,
    };

    validateQuoteRequest(quoteData);

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

    console.log("Email sent successfully:", emailResponse);

    await updateRateLimit(clientIp, currentCount, lastReset);

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
