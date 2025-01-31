import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";

const QuoteCalculator = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleDimensionUpdate = (field: string, value: number) => {
    setStageDimensions((prev) => ({
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
        Get Your Stage Rental Quote
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyForm
            {...stageDimensions}
            onUpdate={handleDimensionUpdate}
          />
          <ServicesForm
            selectedServices={selectedServices}
            onToggleService={handleToggleService}
            height={stageDimensions.height}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceSummary
              {...stageDimensions}
              selectedServices={selectedServices}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;