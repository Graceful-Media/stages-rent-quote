import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";

const QuoteCalculator = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(true);

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
          
          <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
            <div className="border rounded-lg p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-semibold text-quote-primary">Additional Services</h2>
                <ChevronDown className={`h-6 w-6 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ServicesForm
                  selectedServices={selectedServices}
                  onToggleService={handleToggleService}
                  height={stageDimensions.height}
                />
              </CollapsibleContent>
            </div>
          </Collapsible>

          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-quote-primary">DELIVERY / PICK UP</h2>
            <p className="text-gray-700">
              Get your order delivered! Stage delivery prices start at $500 (round-trip) based on location and size order. 
              Don't need delivery? Select "No" below to pick up from our location.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-quote-primary mb-2">WAREHOUSE WILL CALL</h3>
              <p className="text-gray-700">
                Certificate Of Insurance (COI) Required from customer warehouse pick up - COI POLICY
              </p>
            </div>
          </div>
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