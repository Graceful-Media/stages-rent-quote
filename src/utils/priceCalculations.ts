import { carpetColors } from "@/components/services/types";

export const calculateSections = (width: number, depth: number) => {
  const area = width * depth;
  
  // Initialize counts
  let sections4x8Count = 0;
  let sections4x4Count = 0;
  
  // Calculate the maximum number of 4x8 sections that can fit in the width
  const max4x8InWidth = Math.floor(width / 8);
  // Calculate the maximum number of 4x8 sections that can fit in the depth
  const max4x8InDepth = Math.floor(depth / 8);
  
  // Calculate remaining width and depth after placing 4x8 sections
  const remainingWidth = width % 8;
  const remainingDepth = depth % 8;
  
  // If we can fit 4x8 sections in both dimensions
  if (max4x8InWidth > 0 && max4x8InDepth > 0) {
    sections4x8Count = max4x8InWidth * max4x8InDepth;
  }
  
  // Calculate 4x4 sections needed for remaining areas
  
  // Handle remaining width (full depth)
  if (remainingWidth > 0) {
    const sections4x4InRemainingWidth = Math.ceil(remainingWidth / 4);
    sections4x4Count += sections4x4InRemainingWidth * Math.ceil(depth / 4);
  }
  
  // Handle remaining depth (excluding the part already counted in remaining width)
  if (remainingDepth > 0) {
    const fullWidthSections = Math.floor(width / 8) * 8;
    const sections4x4InRemainingDepth = Math.ceil(remainingDepth / 4);
    sections4x4Count += sections4x4InRemainingDepth * Math.floor(fullWidthSections / 4);
  }
  
  console.log("Stage section calculation:", {
    width,
    depth,
    sections4x8: sections4x8Count,
    sections4x4: sections4x4Count,
    max4x8InWidth,
    max4x8InDepth,
    remainingWidth,
    remainingDepth
  });

  return {
    sections4x8: sections4x8Count,
    sections4x4: sections4x4Count
  };
};

export const calculateDeliveryFee = (
  width: number, 
  depth: number, 
  deliveryZipCode: string | null,
  deliveryOption: "delivery" | "pickup" | null
) => {
  // Only calculate delivery fee if both conditions are met
  if (!deliveryZipCode || deliveryOption !== "delivery") {
    console.log("Delivery fee calculation skipped - conditions not met:", {
      hasZipCode: !!deliveryZipCode,
      deliveryOption
    });
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

  console.log("Calculating delivery fee for:", {
    isSmallStage,
    distance,
    zipCode: deliveryZipCode
  });

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

export const calculateTotal = (
  width: number,
  depth: number,
  days: number,
  selectedServices: string[],
  warehouseLocation?: "nj" | "ny" | null,
  deliveryZipCode?: string | null,
  deliveryOption?: "delivery" | "pickup" | null
) => {
  const sections = calculateSections(width, depth);
  const section4x4Price = 75;
  const section4x8Price = 150;
  
  const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                      (sections.sections4x4 * section4x4Price);
  
  let dailyCosts = 0;
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

  // Add daily costs
  dailyCosts += sectionsCost;

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

  console.log("Calculated totals:", {
    dailyCosts,
    oneTimetCosts,
    deliveryFee,
    totalCost: (dailyCosts * days) + oneTimetCosts
  });

  // Calculate final total
  const totalCost = (dailyCosts * days) + oneTimetCosts;

  return {
    dailyCosts,
    oneTimetCosts,
    totalCost,
    deliveryFee
  };
};

export const calculateTotalLegs = (width: number, depth: number) => {
  const sections = calculateSections(width, depth);
  return (sections.sections4x8 + sections.sections4x4) * 4;
};
