import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "npm:@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const rateLimitWindowMs = 3600000; // 1 hour
const maxRequestsPerWindow = 5; // 5 requests per hour per IP

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

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getRateLimitKey = (ip: string): string => {
  return `rate_limit:quote_email:${ip}`;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    console.log("Request from IP:", clientIp);

    // Create Redis-like key for rate limiting
    const rateLimitKey = getRateLimitKey(clientIp);
    
    // Initialize Supabase client with service role key for internal operations
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check rate limit
    const { data: rateLimitData } = await supabaseAdmin
      .from("quote_email_rate_limits")
      .select("count, last_reset")
      .eq("ip_address", clientIp)
      .single();

    const now = new Date();
    let currentCount = 0;

    if (rateLimitData) {
      const lastReset = new Date(rateLimitData.last_reset);
      if (now.getTime() - lastReset.getTime() < rateLimitWindowMs) {
        if (rateLimitData.count >= maxRequestsPerWindow) {
          console.log("Rate limit exceeded for IP:", clientIp);
          return new Response(
            JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
            {
              status: 429,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        currentCount = rateLimitData.count;
      }
    }

    // Parse and validate request
    const { 
      recipientEmail,
      dimensions,
      selectedServices,
      totalCost,
      deliveryOption,
      deliveryZipCode,
      warehouseLocation,
    }: QuoteEmailRequest = await req.json();

    if (!isValidEmail(recipientEmail)) {
      console.log("Invalid email:", recipientEmail);
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Update rate limit counter
    await supabaseAdmin
      .from("quote_email_rate_limits")
      .upsert({
        ip_address: clientIp,
        count: currentCount + 1,
        last_reset: currentCount === 0 ? now.toISOString() : rateLimitData?.last_reset,
      });

    // Send email
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
              $${totalCost.toFixed(2)}
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

    // Store the quote in the database
    const { error: dbError } = await supabaseAdmin
      .from('quotes')
      .insert({
        dimensions,
        selected_services: selectedServices,
        total_cost: totalCost,
        delivery_option: deliveryOption,
        delivery_zip_code: deliveryZipCode,
        warehouse_location: warehouseLocation,
        recipient_email: recipientEmail,
      });

    if (dbError) {
      console.error("Error saving quote:", dbError);
    }

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