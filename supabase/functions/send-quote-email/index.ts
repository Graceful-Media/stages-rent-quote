
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { renderAsync } from "npm:@react-email/components@0.0.7";
import { QuoteEmail } from "./utils/QuoteEmail.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QuoteRequest {
  recipientEmail: string;
  recipientName: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  totalCost: number;
  dailyCosts: number;
  oneTimetCosts: number;
  hasDelivery: boolean;
  hasSetup: boolean;
  hasCarpet: boolean;
  hasWarehouseFee: boolean;
  deliveryOption: "delivery" | "pickup" | null;
  deliveryZipCode: string | null;
  warehouseLocation: "nj" | "ny" | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: QuoteRequest = await req.json();
    console.log('Received quote request:', requestData);

    // Render the email HTML using the React template
    const html = await renderAsync(
      QuoteEmail({
        recipientName: requestData.recipientName,
        ...requestData
      })
    );

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: 'Stage Quotes <quotes@yourstagerental.com>',
      to: [requestData.recipientEmail],
      subject: 'Your Stage Rental Quote',
      html: html,
    });

    console.log('Email sent successfully:', emailResponse);

    return new Response(
      JSON.stringify({ message: 'Quote email sent successfully' }),
      { 
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );

  } catch (error) {
    console.error('Error sending quote email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    );
  }
});
