import React from "react";
import { baseServices, getStairServices } from "../ServicesForm";
import { skirtSides, railSides } from "../services/types";

interface DailyChargesProps {
  selectedServices: string[];
  height: number;
  width: number;
  depth: number;
  calculateSkirtPrice: () => number;
  calculateRailsPrice: () => number;
}

const DailyCharges = ({ 
  selectedServices, 
  height,
  calculateSkirtPrice,
  calculateRailsPrice
}: DailyChargesProps) => {
  const allServices = [...getStairServices(height), ...baseServices];

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
              <span>Stage Skirt ({selectedSkirtSides.join(", ")})</span>
              <span>${price.toLocaleString()}/day</span>
            </div>
          );
        }

        if (service.id === "rails" && selectedRailSides.length > 0) {
          const price = calculateRailsPrice();
          return (
            <div key={serviceId} className="flex justify-between text-sm">
              <span>Safety Rails ({selectedRailSides.join(", ")})</span>
              <span>${price.toLocaleString()}/day</span>
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
    </div>
  );
};

export default DailyCharges;