import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  recipientEmail: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  totalCost: number;
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail,
      dimensions,
      selectedServices,
      totalCost,
      deliveryOption,
      deliveryZipCode,
      warehouseLocation
    }: QuoteEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Stage Rentals <mail@quotes.proavsource.com>",
      to: [recipientEmail],
      subject: "Your Stage Rental Quote",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #333; text-align: center;">Your Stage Rental Quote</h1>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444; margin-bottom: 15px;">Stage Specifications</h2>
            <p><strong>Size:</strong> ${dimensions.width}' × ${dimensions.depth}' × ${dimensions.height}"</p>
            <p><strong>Rental Duration:</strong> ${dimensions.days} ${dimensions.days === 1 ? 'day' : 'days'}</p>
          </div>

          ${selectedServices.length > 0 ? `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #444; margin-bottom: 15px;">Selected Services</h2>
              <ul style="list-style-type: none; padding: 0;">
                ${selectedServices.map(service => `<li style="margin: 5px 0;">• ${service}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          ${deliveryOption ? `
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #444; margin-bottom: 15px;">Delivery Details</h2>
              <p><strong>Delivery Option:</strong> ${deliveryOption}</p>
              ${deliveryZipCode ? `<p><strong>Delivery Zip Code:</strong> ${deliveryZipCode}</p>` : ''}
              ${warehouseLocation ? `<p><strong>Warehouse Location:</strong> ${warehouseLocation.toUpperCase()}</p>` : ''}
            </div>
          ` : ''}

          <div style="background-color: #e8f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #444; margin-bottom: 15px;">Total Quote</h2>
            <p style="font-size: 24px; font-weight: bold; color: #333; text-align: center;">
              ${formatCurrency(totalCost)}
            </p>
            <p style="font-size: 12px; color: #666; text-align: center; margin-top: 10px;">
              *Final price may vary based on event details and location
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666;">
              Thank you for choosing our stage rental services. If you have any questions or would like to proceed with this quote, please contact us.
            </p>
            <p style="color: #666;">
              <strong>Phone:</strong> (555) 123-4567<br>
              <strong>Email:</strong> support@gracefulmedia.org
            </p>
          </div>
        </div>
      `,
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