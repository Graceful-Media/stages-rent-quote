import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import DeliveryForm from "./DeliveryForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { toast } from "./ui/use-toast";
import ContinueToDeliverySection from "./quote/ContinueToDeliverySection";
import ContinueToSetupSection from "./quote/ContinueToSetupSection";
import SetupSection from "./quote/SetupSection";
import ActionButtons from "./quote/ActionButtons";

const QuoteCalculator = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
    days: 1,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup" | null>(null);
  const [continueToDelivery, setContinueToDelivery] = useState<"yes" | "no" | null>(null);
  const [continueToSetup, setContinueToSetup] = useState<"yes" | "no" | null>(null);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [warehouseLocation, setWarehouseLocation] = useState<"nj" | "ny" | null>(null);
  const [deliveryZipCode, setDeliveryZipCode] = useState<string | null>(null);

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

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully.",
    });
  };

  const handlePrintQuote = () => {
    toast({
      title: "Print Quote",
      description: "Your quote is being prepared for printing.",
    });
    window.print();
  };

  const handleResetForm = () => {
    setStageDimensions({ width: 0, depth: 0, height: 0, days: 1 });
    setSelectedServices([]);
    setDeliveryOption(null);
    setContinueToDelivery(null);
    setContinueToSetup(null);
    setWarehouseLocation(null);
    setDeliveryZipCode(null);
    toast({
      title: "Form Reset",
      description: "All fields have been reset to their default values.",
    });
  };

  const handleEmailQuote = () => {
    toast({
      title: "Quote Emailed",
      description: "A copy of your quote has been sent to your email.",
    });
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

          <ContinueToDeliverySection
            continueToDelivery={continueToDelivery}
            onContinueToDeliveryChange={(value) => setContinueToDelivery(value)}
          />

          {continueToDelivery === "yes" && (
            <DeliveryForm
              isOpen={isDeliveryOpen}
              onOpenChange={setIsDeliveryOpen}
              deliveryOption={deliveryOption}
              onDeliveryOptionChange={(value) => {
                setDeliveryOption(value);
                if (value !== "pickup") {
                  setWarehouseLocation(null);
                }
              }}
              onWarehouseLocationChange={(location) => setWarehouseLocation(location)}
              onDeliveryZipCodeChange={(zipCode) => setDeliveryZipCode(zipCode)}
            />
          )}

          <ContinueToSetupSection
            continueToSetup={continueToSetup}
            onContinueToSetupChange={(value) => setContinueToSetup(value)}
          />

          {continueToSetup === "yes" && (
            <SetupSection
              isOpen={isSetupOpen}
              onOpenChange={setIsSetupOpen}
            />
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <PriceSummary
              {...stageDimensions}
              selectedServices={selectedServices}
              warehouseLocation={warehouseLocation}
              deliveryZipCode={deliveryZipCode}
            />
            <ActionButtons
              onResetForm={handleResetForm}
              onEmailQuote={handleEmailQuote}
              onPrintQuote={handlePrintQuote}
              onPlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;