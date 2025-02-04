import { calculateSections, calculateTotalLegs } from './calculations/sectionCalculations';
import { calculateDailyRateMultiplier } from './calculations/rateCalculations';
import { calculateDeliveryFee } from './calculations/deliveryCalculations';
import { calculateSkirtPrice, calculateRailsPrice } from './calculations/accessoryCalculations';
import { carpetColors } from '@/components/services/types';

export {
  calculateSections,
  calculateTotalLegs,
  calculateSkirtPrice,
  calculateRailsPrice
};

export const calculateTotal = (
  width: number,
  depth: number,
  days: number,
  selectedServices: string[],
  warehouseLocation?: "nj" | "ny" | null,
  deliveryZipCode?: string | null,
  deliveryOption?: "delivery" | "pickup" | null
) => {
  console.log("Calculating total with params:", {
    width, depth, days, selectedServices, warehouseLocation,
    deliveryZipCode, deliveryOption
  });

  const sections = calculateSections(width, depth);
  const section4x4Price = 75;
  const section4x8Price = 150;
  
  const baseSectionsCost = (sections.sections4x8 * section4x8Price) + 
                          (sections.sections4x4 * section4x4Price);
  
  console.log("Base sections cost:", baseSectionsCost);
  
  const rateMultiplier = calculateDailyRateMultiplier(days);
  console.log("Rate multiplier:", rateMultiplier);
  
  let dailyCosts = baseSectionsCost;
  let oneTimetCosts = 0;

  // Handle carpet separately (one-time cost)
  if (selectedServices.includes("carpet")) {
    const selectedColorId = selectedServices.find(service => 
      service.startsWith("carpet-")
    )?.replace("carpet-", "");
    
    const selectedColor = carpetColors.find(color => color.id === selectedColorId);
    const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
    
    oneTimetCosts += carpetPrice * (width * depth);
  }

  // Add daily costs with multiplier
  dailyCosts = baseSectionsCost * rateMultiplier;

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
  const deliveryFee = calculateDeliveryFee(
    width, 
    depth, 
    deliveryZipCode || null, 
    deliveryOption || null
  );
  oneTimetCosts += deliveryFee;

  console.log("Calculated totals:", {
    dailyCosts,
    oneTimetCosts,
    deliveryFee,
    rateMultiplier,
    totalCost: dailyCosts + oneTimetCosts
  });

  return {
    dailyCosts,
    oneTimetCosts,
    totalCost: dailyCosts + oneTimetCosts,
    deliveryFee
  };
};