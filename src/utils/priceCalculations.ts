
import { carpetColors } from "@/components/services/types";

export const calculateSections = (width: number, depth: number) => {
  // Calculate full 8' rows needed
  const numAcross = Math.ceil(width / 4); // How many 4' sections needed across width
  const fullRows = Math.floor(depth / 8); // Number of full 8' rows
  const hasPartialRow = depth % 8 > 0;    // Whether there's a remaining 4' row
  
  // Calculate sections
  const sections4x8 = numAcross * fullRows;
  const sections4x4 = hasPartialRow ? numAcross : 0;
  
  return {
    sections4x8,
    sections4x4
  };
};

export const calculateDeliveryFee = (
  width: number, 
  depth: number, 
  deliveryDetails: any,
  deliveryOption: "delivery" | "pickup" | null
) => {
  // Only calculate delivery fee if both conditions are met
  if (!deliveryDetails?.zipCode || deliveryOption !== "delivery") {
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

export const calculateRailsPrice = (selectedServices: string[], width: number, depth: number) => {
  const selectedSides = selectedServices
    .filter(service => service.startsWith("rail-side-"))
    .map(service => service.replace("rail-side-", ""));

  let totalLength = 0;
  selectedSides.forEach(side => {
    if (side === "front" || side === "rear") {
      totalLength += width;
    } else if (side === "left" || side === "right") {
      totalLength += depth;
    }
  });

  const numOf8ftSections = Math.floor(totalLength / 8);
  const remaining = totalLength % 8;
  const numOf4ftSections = Math.ceil(remaining / 4);
  const totalPrice = (numOf8ftSections * 60) + (numOf4ftSections * 50);

  return totalPrice;
};

export const calculateSkirtPrice = (selectedServices: string[], width: number, depth: number) => {
  const selectedSides = selectedServices
    .filter(service => service.startsWith("skirt-side-"))
    .map(service => service.replace("skirt-side-", ""));

  let totalLength = 0;
  selectedSides.forEach(side => {
    if (side === "front" || side === "rear") {
      totalLength += width;
    } else if (side === "left" || side === "right") {
      totalLength += depth;
    }
  });

  return totalLength * 3; // $3 per linear foot
};

export const calculateStairsPrice = (selectedServices: string[]) => {
  let totalPrice = 0;
  // Get unique service IDs (prevent duplicates)
  const uniqueServices = new Set(selectedServices);
  
  uniqueServices.forEach(serviceId => {
    if (serviceId.includes("-qty-")) {
      const [baseServiceId, quantity] = serviceId.split("-qty-");
      if (baseServiceId === "stairs-with-rails") {
        totalPrice += 150 * parseInt(quantity); // $150 per set of stairs with rails
      } else if (baseServiceId === "stairs-no-rails") {
        totalPrice += 75 * parseInt(quantity);  // $75 per set of stairs without rails
      }
    }
  });
  
  return totalPrice;
};

export const calculateTotal = (
  width: number,
  depth: number,
  days: number,
  selectedServices: string[],
  warehouseLocation?: "nj" | "ny" | null,
  deliveryDetails?: any,
  deliveryOption?: "delivery" | "pickup" | null,
  setupCost: number = 0
) => {
  const sections = calculateSections(width, depth);
  const section4x4Price = 75;
  const section4x8Price = 150;
  
  const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                      (sections.sections4x4 * section4x4Price);
  
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
  const deliveryFee = calculateDeliveryFee(width, depth, deliveryDetails, deliveryOption || null);
  oneTimetCosts += deliveryFee;

  return {
    dailyCosts,
    oneTimetCosts,
    totalCost: (dailyCosts * days) + oneTimetCosts,
    deliveryFee
  };
};

export const calculateTotalLegs = (width: number, depth: number) => {
  const sections = calculateSections(width, depth);
  return (sections.sections4x8 + sections.sections4x4) * 4;
};
