import { SupabaseClient } from "@supabase/supabase-js";

export const checkRateLimit = async (
  supabaseAdmin: SupabaseClient,
  clientIp: string,
  maxRequestsPerWindow: number,
  rateLimitWindowMs: number
) => {
  const { data: rateLimitData, error: rateLimitError } = await supabaseAdmin
    .from("quote_email_rate_limits")
    .select("count, last_reset")
    .eq("ip_address", clientIp)
    .single();

  if (rateLimitError && rateLimitError.code !== "PGRST116") {
    console.error("Error checking rate limit:", rateLimitError);
    throw new Error("Failed to check rate limit");
  }

  const now = new Date();
  let currentCount = 0;

  if (rateLimitData) {
    const lastReset = new Date(rateLimitData.last_reset);
    if (now.getTime() - lastReset.getTime() < rateLimitWindowMs) {
      if (rateLimitData.count >= maxRequestsPerWindow) {
        return { isLimited: true, currentCount: rateLimitData.count, lastReset: lastReset };
      }
      currentCount = rateLimitData.count;
    }
  }

  return { isLimited: false, currentCount, lastReset: rateLimitData?.last_reset };
};

export const updateRateLimit = async (
  supabaseAdmin: SupabaseClient,
  clientIp: string,
  currentCount: number,
  lastReset: string | undefined
) => {
  const { error: updateError } = await supabaseAdmin
    .from("quote_email_rate_limits")
    .upsert({
      ip_address: clientIp,
      count: currentCount + 1,
      last_reset: currentCount === 0 ? new Date().toISOString() : lastReset,
    });

  if (updateError) {
    console.error("Error updating rate limit:", updateError);
    throw new Error("Failed to update rate limit");
  }
};