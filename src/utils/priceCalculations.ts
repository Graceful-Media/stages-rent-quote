import { carpetColors } from "@/components/services/types";

interface SectionCounts {
  sections4x8: number;
  sections4x4: number;
  sections2x8: number;
  sections8x2: number;
  sections2x6: number;
  sections6x2: number;
  sections2x4: number;
  sections4x2: number;
  sections2x2: number;
}

export const calculateSections = (width: number, depth: number): SectionCounts => {
  // Calculate width sections
  const numFull4ftAcross = Math.floor(width / 4);  // Full 4' sections
  const remaining2ftWidth = (width % 4) >= 2 ? 1 : 0;  // Remaining 2' section if needed
  
  // Calculate depth sections
  const fullRows8ft = Math.floor(depth / 8);       // Full 8' rows
  const fullRows6ft = Math.floor((depth % 8) / 6); // Full 6' rows from remaining
  const remaining4ftDepth = Math.floor((depth % 8 % 6) / 4);  // 4' row if needed
  const remaining2ftDepth = ((depth % 8 % 6 % 4) >= 2) ? 1 : 0;  // 2' row if needed

  // Calculate 4' wide sections
  const sections4x8 = numFull4ftAcross * fullRows8ft;
  const sections4x4 = numFull4ftAcross * remaining4ftDepth;
  const sections4x2 = numFull4ftAcross * remaining2ftDepth;

  // Calculate 2' wide sections
  const sections2x8 = remaining2ftWidth * fullRows8ft;
  const sections2x6 = remaining2ftWidth * fullRows6ft;
  const sections2x4 = remaining2ftWidth * remaining4ftDepth;
  const sections2x2 = remaining2ftWidth * remaining2ftDepth;

  // Calculate rotated sections (8x2, 6x2)
  const sections8x2 = 0; // These will be calculated when needed
  const sections6x2 = 0; // These will be calculated when needed
  
  return {
    sections4x8,
    sections4x4,
    sections2x8,
    sections8x2,
    sections2x6,
    sections6x2,
    sections2x4,
    sections4x2,
    sections2x2
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
  deliveryZipCode?: string | null,
  deliveryOption?: "delivery" | "pickup" | null,
  setupCost: number = 0
) => {
  const sections = calculateSections(width, depth);
  const section4x8Price = 150;
  const section4x4Price = 75;
  const section2x8Price = 85;  // New price for 2x8 sections
  const section2x6Price = 85;  // New price for 2x6 sections
  const section2x4Price = 55;
  const section4x2Price = 55;
  const section2x2Price = 50;
  
  const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                      (sections.sections4x4 * section4x4Price) +
                      (sections.sections2x8 * section2x8Price) +
                      (sections.sections8x2 * section2x8Price) +
                      (sections.sections2x6 * section2x6Price) +
                      (sections.sections6x2 * section2x6Price) +
                      (sections.sections2x4 * section2x4Price) +
                      (sections.sections4x2 * section4x2Price) +
                      (sections.sections2x2 * section2x2Price);
  
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

export const calculateTotalLegs = (width: number, depth: number) => {
  const sections = calculateSections(width, depth);
  return (sections.sections4x8 + sections.sections4x4 + 
          sections.sections2x8 + sections.sections8x2 + 
          sections.sections2x6 + sections.sections6x2 + 
          sections.sections2x4 + sections.sections4x2 + 
          sections.sections2x2) * 4;
};
