import React from "react";
import { services } from "./ServicesForm";

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
  const calculateTotal = () => {
    const squareFootage = width * depth;
    const basePrice = squareFootage * 2; // Base price per square foot
    const selectedServicesPrices = services
      .filter((service) => selectedServices.includes(service.id))
      .reduce((total, service) => total + service.basePrice, 0);
    
    return basePrice + selectedServicesPrices;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-quote-primary mb-4">Price Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span>Stage Size:</span>
          <span>{width}' × {depth}' × {height}'</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Square Footage:</span>
          <span>{width * depth} sq ft</span>
        </div>
        <div className="border-t pt-3">
          <div className="space-y-2">
            {selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return (
                <div key={serviceId} className="flex justify-between text-sm">
                  <span>{service?.name}:</span>
                  <span>${service?.basePrice.toLocaleString()}</span>
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