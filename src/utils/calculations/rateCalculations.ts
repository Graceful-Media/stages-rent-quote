export const calculateDailyRateMultiplier = (days: number) => {
  console.log("Calculating daily rate multiplier for days:", days);
  
  if (days <= 3) {
    console.log("Using 1x multiplier (1-3 days)");
    return 1;
  } else if (days <= 7) {
    console.log("Using 3x multiplier (4-7 days)");
    return 3;
  } else if (days <= 30) {
    console.log("Using 8x multiplier (8-30 days)");
    return 8;
  } else {
    // For 31+ days, use 8x for first 30 days plus 2x for each additional week
    const baseRate = 8; // First 30 days
    const remainingDays = days - 30;
    const additionalWeeks = Math.ceil(remainingDays / 7);
    const additionalRate = additionalWeeks * 2;
    console.log(`Using ${baseRate + additionalRate}x multiplier (31+ days)`);
    return baseRate + additionalRate;
  }
};