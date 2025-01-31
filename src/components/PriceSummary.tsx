import React from "react";
import { baseServices, getStairServices, carpetColors } from "./ServicesForm";
import { skirtSides, railSides } from "./services/types";

interface PriceSummaryProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  selectedServices: string[];
}

const PriceSummary = ({
  width,
  depth,
  height,
  days,
  selectedServices,
}: PriceSummaryProps) => {
  const calculateSections = () => {
    const area = width * depth;
    const sections4x8Count = Math.floor(area / 32);
    const remaining = area % 32;
    const sections4x4Count = Math.ceil(remaining / 16);
    
    return {
      sections4x8: sections4x8Count,
      sections4x4: sections4x4Count
    };
  };

  const calculateRailsPrice = () => {
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

    // Calculate number of 8' and 4' sections needed
    const numOf8ftSections = Math.floor(totalLength / 8);
    const remaining = totalLength % 8;
    const numOf4ftSections = Math.ceil(remaining / 4);

    // Calculate total price (8' = $60, 4' = $50)
    const totalPrice = (numOf8ftSections * 60) + (numOf4ftSections * 50);

    console.log("Rails calculation:", {
      selectedSides,
      totalLength,
      numOf8ftSections,
      numOf4ftSections,
      totalPrice
    });

    return totalPrice;
  };

  const calculateSkirtPrice = () => {
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

    console.log("Skirt calculation:", {
      selectedSides,
      totalLength,
      pricePerFoot: 3,
      totalPrice: totalLength * 3
    });

    return totalLength * 3; // $3 per linear foot
  };

  const calculateTotal = () => {
    const sections = calculateSections();
    const section4x4Price = 75;
    const section4x8Price = 150;
    
    const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                        (sections.sections4x4 * section4x4Price);
    
    const allServices = [...getStairServices(height), ...baseServices];
    let totalCost = 0;
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
      dailyCosts += calculateSkirtPrice();
    }

    // Handle rails separately (daily cost)
    if (selectedServices.includes("rails")) {
      dailyCosts += calculateRailsPrice();
    }

    // Add other services (excluding special cases)
    dailyCosts += allServices
      .filter(service => 
        selectedServices.includes(service.id) && 
        !["carpet", "skirt", "rails"].includes(service.id)
      )
      .reduce((total, service) => total + service.basePrice, 0);

    // Calculate final total
    totalCost = (dailyCosts * days) + oneTimetCosts;

    return {
      dailyCosts,
      oneTimetCosts,
      totalCost
    };
  };

  const calculateTotalLegs = () => {
    const sections = calculateSections();
    return (sections.sections4x8 + sections.sections4x4) * 4;
  };

  const sections = calculateSections();
  const totalLegs = calculateTotalLegs();
  const allServices = [...getStairServices(height), ...baseServices];
  const totals = calculateTotal();

  const selectedColorId = selectedServices.find(service => 
    service.startsWith("carpet-")
  )?.replace("carpet-", "");
  const selectedCarpetColor = carpetColors.find(color => color.id === selectedColorId);

  // Get selected skirt sides
  const selectedSkirtSides = selectedServices
    .filter(service => service.startsWith("skirt-side-"))
    .map(service => {
      const sideId = service.replace("skirt-side-", "");
      return skirtSides.find(side => side.id === sideId)?.name || sideId;
    });

  // Get selected rail sides
  const selectedRailSides = selectedServices
    .filter(service => service.startsWith("rail-side-"))
    .map(service => {
      const sideId = service.replace("rail-side-", "");
      return railSides.find(side => side.id === sideId)?.name || sideId;
    });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-quote-primary mb-4">Price Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Stage Size:</span>
          <span>{width}' × {depth}' × {height}"</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Rental Duration:</span>
          <span>{days} {days === 1 ? "day" : "days"}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>4'x8' Sections:</span>
          <span>{sections.sections4x8}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>4'x4' Sections:</span>
          <span>{sections.sections4x4}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total Legs Required:</span>
          <span>{totalLegs}</span>
        </div>

        <div className="border-t pt-3">
          <div className="space-y-2">
            <div className="font-medium text-sm text-gray-600">Daily Charges:</div>
            {selectedServices.map((serviceId) => {
              if (serviceId.startsWith("carpet-")) return null;
              
              const service = allServices.find((s) => s.id === serviceId);
              if (!service) return null;

              if (service.id === "skirt" && selectedSkirtSides.length > 0) {
                const price = calculateSkirtPrice();
                return (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>
                      Stage Skirt ({selectedSkirtSides.join(", ")})
                    </span>
                    <span>
                      ${price.toLocaleString()}/day
                    </span>
                  </div>
                );
              }

              if (service.id === "rails" && selectedRailSides.length > 0) {
                const price = calculateRailsPrice();
                return (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>
                      Safety Rails ({selectedRailSides.join(", ")})
                    </span>
                    <span>
                      ${price.toLocaleString()}/day
                    </span>
                  </div>
                );
              }

              if (service.id === "skirt" || service.id === "rails" || service.id === "carpet") return null;

              return (
                <div key={serviceId} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span>${service.basePrice.toLocaleString()}/day</span>
                </div>
              );
            })}

            <div className="font-medium text-sm text-gray-600 mt-4">One-time Charges:</div>
            {selectedServices.includes("carpet") && (
              <div className="flex justify-between text-sm">
                <span>
                  Carpet - {selectedCarpetColor?.name || "Black"} ({width * depth} sq ft)
                </span>
                <span>
                  ${((selectedCarpetColor?.price || carpetColors[0].price) * (width * depth)).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between text-sm font-medium">
            <span>Daily Total:</span>
            <span>${totals.dailyCosts.toLocaleString()}/day</span>
          </div>
          <div className="flex justify-between text-sm font-medium mt-2">
            <span>One-time Charges:</span>
            <span>${totals.oneTimetCosts.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mt-4">
            <span>Total Estimate:</span>
            <span>${totals.totalCost.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            *Final price may vary based on event details and location
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
