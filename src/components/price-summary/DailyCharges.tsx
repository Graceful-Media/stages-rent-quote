
import React from "react";
import { baseServices, getStairServices } from "../ServicesForm";
import { skirtSides, railSides, carpetColors } from "../services/types";

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
  width,
  depth,
  calculateSkirtPrice,
  calculateRailsPrice
}: DailyChargesProps) => {
  const allServices = [...getStairServices(height), ...baseServices];

  const getServiceLabel = (serviceId: string): { name: string; price: number } | null => {
    // Handle stairs with quantity
    if (serviceId.includes("-qty-")) {
      const [baseServiceId, quantity] = serviceId.split("-qty-");
      const service = allServices.find((s) => s.id === baseServiceId);
      if (!service) return null;
      
      return {
        name: `${service.name} (Qty: ${quantity})`,
        price: service.basePrice * parseInt(quantity)
      };
    }

    // Handle carpet with color and square footage
    if (serviceId.startsWith("carpet-")) {
      const colorId = serviceId.replace("carpet-", "");
      const color = carpetColors.find(c => c.id === colorId);
      if (!color) return null;
      
      const carpetService = allServices.find(s => s.id === "carpet");
      if (!carpetService) return null;

      const squareFootage = width * depth;
      
      return {
        name: `Carpet - ${color.name}, ${squareFootage} sq.ft`,
        price: color.price
      };
    }

    // Handle skirt with sides
    if (serviceId === "skirt" && selectedServices.some(s => s.startsWith("skirt-side-"))) {
      const selectedSkirtSides = selectedServices
        .filter(s => s.startsWith("skirt-side-"))
        .map(s => {
          const sideId = s.replace("skirt-side-", "");
          return skirtSides.find(side => side.id === sideId)?.name || sideId;
        });

      return {
        name: `Stage Skirt (${selectedSkirtSides.join(", ")})`,
        price: calculateSkirtPrice()
      };
    }

    // Handle rails with sides
    if (serviceId === "rails" && selectedServices.some(s => s.startsWith("rail-side-"))) {
      const selectedRailSides = selectedServices
        .filter(s => s.startsWith("rail-side-"))
        .map(s => {
          const sideId = s.replace("rail-side-", "");
          return railSides.find(side => side.id === sideId)?.name || sideId;
        });

      return {
        name: `Safety Rails (${selectedRailSides.join(", ")})`,
        price: calculateRailsPrice()
      };
    }

    // Handle standard services
    const service = allServices.find((s) => s.id === serviceId);
    if (!service) return null;

    return {
      name: service.name,
      price: service.basePrice
    };
  };

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm text-gray-600">Daily Charges:</div>
      {selectedServices.map((serviceId) => {
        // Skip carpet color selections as they're handled with the main carpet service
        if (serviceId.startsWith("carpet-")) return null;
        // Skip individual skirt/rail sides as they're handled with their main services
        if (serviceId.startsWith("skirt-side-") || serviceId.startsWith("rail-side-")) return null;
        // Skip the base skirt/rails services if they have sides selected
        if ((serviceId === "skirt" && !selectedServices.some(s => s.startsWith("skirt-side-"))) ||
            (serviceId === "rails" && !selectedServices.some(s => s.startsWith("rail-side-")))) return null;

        const serviceDetails = getServiceLabel(serviceId);
        if (!serviceDetails) return null;

        return (
          <div key={serviceId} className="flex justify-between text-sm">
            <span>{serviceDetails.name}</span>
            <span>${serviceDetails.price.toLocaleString()}/day</span>
          </div>
        );
      })}
    </div>
  );
};

export default DailyCharges;

