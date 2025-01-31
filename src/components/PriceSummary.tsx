import React from "react";
import { services } from "./ServicesForm";

interface PriceSummaryProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  selectedServices: string[];
}

const PriceSummary = ({
  bedrooms,
  bathrooms,
  sqft,
  selectedServices,
}: PriceSummaryProps) => {
  const calculateTotal = () => {
    const basePrice = sqft * 2; // Base price per sqft
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
          <span>Property Size:</span>
          <span>{sqft} sqft</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Bedrooms:</span>
          <span>{bedrooms}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Bathrooms:</span>
          <span>{bathrooms}</span>
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
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;