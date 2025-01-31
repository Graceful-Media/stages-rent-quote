import React from "react";
import { baseServices, getStairServices, carpetColors, skirtSides } from "./ServicesForm";

interface PriceSummaryProps {
  width: number;
  depth: number;
  height: number;
  selectedServices: string[];
}

const PriceSummary = ({
  width,
  depth,
  height,
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
    let totalCost = sectionsCost;

    // Handle carpet separately
    if (selectedServices.includes("carpet")) {
      const selectedColorId = selectedServices.find(service => 
        service.startsWith("carpet-")
      )?.replace("carpet-", "");
      
      const selectedColor = carpetColors.find(color => color.id === selectedColorId);
      const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
      
      console.log("Carpet calculation:", {
        selectedColorId,
        carpetPrice,
        area: width * depth,
        totalCarpetCost: carpetPrice * (width * depth)
      });
      
      totalCost += carpetPrice * (width * depth);
    }

    // Handle skirt separately
    if (selectedServices.includes("skirt")) {
      totalCost += calculateSkirtPrice();
    }

    // Add other services (excluding carpet and skirt which are handled separately)
    totalCost += allServices
      .filter(service => 
        selectedServices.includes(service.id) && 
        service.id !== "carpet" &&
        service.id !== "skirt"
      )
      .reduce((total, service) => total + service.basePrice, 0);

    return totalCost;
  };

  const calculateTotalLegs = () => {
    const sections = calculateSections();
    return (sections.sections4x8 + sections.sections4x4) * 4;
  };

  const sections = calculateSections();
  const totalLegs = calculateTotalLegs();
  const allServices = [...getStairServices(height), ...baseServices];

  // Find selected carpet color
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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-quote-primary mb-4">Price Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Stage Size:</span>
          <span>{width}' × {depth}' × {height}"</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Square Footage:</span>
          <span>{width * depth} sq ft</span>
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
            {selectedServices.map((serviceId) => {
              if (serviceId.startsWith("carpet-") || serviceId.startsWith("skirt-side-")) return null;
              
              const service = allServices.find((s) => s.id === serviceId);
              if (!service) return null;

              if (service.id === "carpet") {
                return (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>
                      Carpet - {selectedCarpetColor?.name || "Black"} ({width * depth} sq ft)
                    </span>
                    <span>
                      ${((selectedCarpetColor?.price || carpetColors[0].price) * (width * depth)).toLocaleString()}
                    </span>
                  </div>
                );
              }

              if (service.id === "skirt" && selectedSkirtSides.length > 0) {
                return (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>
                      Stage Skirt ({selectedSkirtSides.join(", ")})
                    </span>
                    <span>
                      ${calculateSkirtPrice().toLocaleString()}
                    </span>
                  </div>
                );
              }

              if (service.id === "skirt") return null;

              return (
                <div key={serviceId} className="flex justify-between text-sm">
                  <span>{service.name}</span>
                  <span>${service.basePrice.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Estimate:</span>
            <span>${calculateTotal().toLocaleString()}</span>
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
