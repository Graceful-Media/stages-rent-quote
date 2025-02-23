
import { calculateSections } from "./sectionCalculations";

export const calculateDeliveryFee = (
  width: number, 
  depth: number, 
  deliveryZipCode: string | null,
  deliveryOption: "delivery" | "pickup" | null
) => {
  // Only calculate delivery fee if both conditions are met
  if (!deliveryZipCode || deliveryOption !== "delivery") {
    return 0;
  }

  const sections = calculateSections(width, depth);
  const totalSections4x4 = sections.sections4x4;
  const totalSections4x8 = sections.sections4x8;

  // Determine if it's a small or large stage
  const isSmallStage = (totalSections4x4 <= 6 && totalSections4x8 === 0) || 
                      (totalSections4x8 <= 3 && totalSections4x4 === 0);

  // For now, assuming 20 miles radius for testing
  const distance = 20; // Mock distance - will need geocoding service to calculate actual distance

  if (isSmallStage) {
    if (distance <= 20) return 200;
    if (distance <= 60) return 650;
    if (distance <= 150) return 900;
  } else {
    if (distance <= 20) return 650;
    if (distance <= 60) return 850;
    if (distance <= 120) return 1200;
    if (distance <= 150) return 1500;
  }

  return 0;
};
