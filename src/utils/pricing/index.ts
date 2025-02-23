
import { carpetColors } from "@/components/services/types";
import { calculateSections } from "./sectionCalculations";
import { calculateDeliveryFee } from "./deliveryCalculations";
import { 
  calculateRailsPrice, 
  calculateSkirtPrice, 
  calculateStairsPrice 
} from "./additionalServicesCalculations";
import { SectionPrices } from "./types";

const sectionPrices: SectionPrices = {
  section4x8Price: 150,  // $150 per 4x8 section
  section4x4Price: 75,   // $75 per 4x4 section
  section2x8Price: 85,   // $85 per 2x8 section
  section2x4Price: 55,   // $55 per 2x4 section
  section4x2Price: 55,   // $55 per 4x2 section
  section2x2Price: 50,   // $50 per 2x2 section
};

export const calculateTotal = (
  width: number,
  depth: number,
  days: number,
  selectedServices: string[],
  warehouseLocation?: "nj" | "ny" | null,
  deliveryZipCode?: string | null,
  deliveryOption?: "delivery" | "pickup" | null,
  setupCost: number = 0
) => {
  const sections = calculateSections(width, depth);
  
  const sectionsCost = (
    sections.sections4x8 * sectionPrices.section4x8Price +
    sections.sections4x4 * sectionPrices.section4x4Price +
    sections.sections2x8 * sectionPrices.section2x8Price +
    sections.sections2x4 * sectionPrices.section2x4Price +
    sections.sections4x2 * sectionPrices.section4x2Price +
    sections.sections2x2 * sectionPrices.section2x2Price
  );
  
  let dailyCosts = sectionsCost;
  let oneTimetCosts = setupCost;

  // Calculate stairs cost first
  const stairsCost = calculateStairsPrice(selectedServices);
  dailyCosts += stairsCost;

  // Handle carpet separately (one-time cost)
  if (selectedServices.includes("carpet")) {
    const selectedColorId = selectedServices.find(service => 
      service.startsWith("carpet-")
    )?.replace("carpet-", "");
    
    const selectedColor = carpetColors.find(color => color.id === selectedColorId);
    const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
    
    oneTimetCosts += carpetPrice * (width * depth);
  }

  // Handle skirt separately (daily cost)
  if (selectedServices.includes("skirt")) {
    dailyCosts += calculateSkirtPrice(selectedServices, width, depth);
  }

  // Handle rails separately (daily cost)
  if (selectedServices.includes("rails")) {
    dailyCosts += calculateRailsPrice(selectedServices, width, depth);
  }

  // Add Brooklyn warehouse prep fee if applicable (only once)
  if (warehouseLocation === "ny") {
    oneTimetCosts += 50; // $50 BK Warehouse Prep Fee
  }

  // Add delivery fee only if both conditions are met
  const deliveryFee = calculateDeliveryFee(width, depth, deliveryZipCode || null, deliveryOption || null);
  oneTimetCosts += deliveryFee;

  return {
    dailyCosts,
    oneTimetCosts,
    totalCost: (dailyCosts * days) + oneTimetCosts,
    deliveryFee
  };
};

// Re-export necessary functions
export { calculateSections, calculateTotalLegs } from "./sectionCalculations";
export { calculateDeliveryFee } from "./deliveryCalculations";
export { 
  calculateRailsPrice, 
  calculateSkirtPrice, 
  calculateStairsPrice 
} from "./additionalServicesCalculations";
