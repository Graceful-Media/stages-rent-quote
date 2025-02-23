
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
