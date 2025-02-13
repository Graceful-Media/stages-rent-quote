
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

type SupabaseClient = ReturnType<typeof createClient>;

export const checkRateLimit = async (
  clientIp: string,
  maxRequestsPerWindow: number = 5,
  rateLimitWindowMs: number = 3600000 // 1 hour in milliseconds
) => {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: rateLimitData, error: rateLimitError } = await supabaseAdmin
    .from("quote_email_rate_limits")
    .select("count, last_reset")
    .eq("ip_address", clientIp)
    .single();

  if (rateLimitError && rateLimitError.code !== "PGRST116") {
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
  clientIp: string,
  currentCount: number,
  lastReset: string | undefined
) => {
  const supabaseAdmin = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { error: updateError } = await supabaseAdmin
    .from("quote_email_rate_limits")
    .upsert({
      ip_address: clientIp,
      count: currentCount + 1,
      last_reset: currentCount === 0 ? new Date().toISOString() : lastReset,
    });

  if (updateError) {
    throw new Error("Failed to update rate limit");
  }
};
