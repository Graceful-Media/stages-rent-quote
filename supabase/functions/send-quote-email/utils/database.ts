
import { SupabaseClient } from "@supabase/supabase-js";
import { QuoteEmailRequest } from "./validation";

export const saveQuoteToDatabase = async (
  supabaseAdmin: SupabaseClient,
  quoteData: QuoteEmailRequest
) => {
  const { error: quoteError } = await supabaseAdmin
    .from('quotes')
    .insert({
      dimensions: quoteData.dimensions,
      selected_services: quoteData.selectedServices,
      total_cost: quoteData.totalCost,
      delivery_option: quoteData.deliveryOption,
      delivery_zip_code: quoteData.deliveryZipCode,
      warehouse_location: quoteData.warehouseLocation,
      recipient_email: quoteData.recipientEmail,
    });

  if (quoteError) {
    throw new Error("Failed to save quote");
  }
};
