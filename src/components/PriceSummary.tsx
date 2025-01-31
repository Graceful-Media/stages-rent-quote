import React from "react";
import { baseServices, getStairServices, carpetColors } from "./ServicesForm";

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
    const sections4x8Count = Math.floor(area / 32); // Number of 4x8 sections
    const remaining = area % 32;
    const sections4x4Count = Math.ceil(remaining / 16); // Number of 4x4 sections needed for remaining area
    
    return {
      sections4x8: sections4x8Count,
      sections4x4: sections4x4Count
    };
  };

  const calculateTotal = () => {
    const sections = calculateSections();
    const section4x4Price = 75; // Price per 4x4 section
    const section4x8Price = 150; // Price per 4x8 section
    
    const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                        (sections.sections4x4 * section4x4Price);
    
    const allServices = [...getStairServices(height), ...baseServices];
    const selectedServicesPrices = allServices
      .filter((service) => selectedServices.includes(service.id))
      .reduce((total, service) => {
        if (service.id === "carpet") {
          // Find the selected carpet color and its price
          const selectedColor = carpetColors.find(color => 
            selectedServices.includes(`carpet-${color.id}`)
          );
          const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
          // Calculate carpet cost based on square footage and selected color price
          return total + (carpetPrice * (width * depth));
        }
        return total + service.basePrice;
      }, 0);
    
    return sectionsCost + selectedServicesPrices;
  };

  const calculateTotalLegs = () => {
    const sections = calculateSections();
    // Each section (4x4 or 4x8) needs 4 legs
    return (sections.sections4x8 + sections.sections4x4) * 4;
  };

  const sections = calculateSections();
  const totalLegs = calculateTotalLegs();
  const allServices = [...getStairServices(height), ...baseServices];

  // Find selected carpet color
  const selectedCarpetColor = carpetColors.find(color => 
    selectedServices.includes(`carpet-${color.id}`)
  );

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
              const service = allServices.find((s) => s.id === serviceId);
              if (!service) return null;

              // Special handling for carpet display
              if (service.id === "carpet") {
                return (
                  <div key={serviceId} className="flex justify-between text-sm">
                    <span>
                      Carpet - {selectedCarpetColor?.name || "Black"} ({width * depth} sq ft)
                    </span>
                    <span>
                      ${(selectedCarpetColor?.price || carpetColors[0].price * (width * depth)).toLocaleString()}
                    </span>
                  </div>
                );
              }

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