import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";

const QuoteCalculator = () => {
  const [propertyDetails, setPropertyDetails] = useState({
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handlePropertyUpdate = (field: string, value: number) => {
    setPropertyDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-quote-primary text-center mb-8">
        Get Your Staging Quote
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyForm
            {...propertyDetails}
            onUpdate={handlePropertyUpdate}
          />
          <ServicesForm
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceSummary
              {...propertyDetails}
              selectedServices={selectedServices}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;