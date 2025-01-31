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

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm text-gray-600">Daily Charges:</div>
      {selectedServices.map((serviceId) => {
        if (serviceId.startsWith("carpet-")) return null;
        
        // Handle stairs with quantity
        if (serviceId.includes("-qty-")) {
          const [baseServiceId, quantity] = serviceId.split("-qty-");
          const service = allServices.find((s) => s.id === baseServiceId);
          if (!service) return null;
          
          const totalPrice = service.basePrice * parseInt(quantity);
          return (
            <div key={serviceId} className="flex justify-between text-sm">
              <span>{service.name} (Qty: {quantity})</span>
              <span>${totalPrice.toLocaleString()}/day</span>
            </div>
          );
        }

        const service = allServices.find((s) => s.id === serviceId);
        if (!service) return null;

        if (service.id === "skirt" && selectedServices.some(s => s.startsWith("skirt-side-"))) {
          const price = calculateSkirtPrice();
          const selectedSkirtSides = selectedServices
            .filter(s => s.startsWith("skirt-side-"))
            .map(s => {
              const sideId = s.replace("skirt-side-", "");
              return skirtSides.find(side => side.id === sideId)?.name || sideId;
            });

          return (
            <div key={serviceId} className="flex justify-between text-sm">
              <span>Stage Skirt ({selectedSkirtSides.join(", ")})</span>
              <span>${price.toLocaleString()}/day</span>
            </div>
          );
        }

        if (service.id === "rails" && selectedServices.some(s => s.startsWith("rail-side-"))) {
          const price = calculateRailsPrice();
          const selectedRailSides = selectedServices
            .filter(s => s.startsWith("rail-side-"))
            .map(s => {
              const sideId = s.replace("rail-side-", "");
              return railSides.find(side => side.id === sideId)?.name || sideId;
            });

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