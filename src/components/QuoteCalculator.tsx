import React from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import DeliveryForm from "./DeliveryForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import ContinueToDeliverySection from "./quote/ContinueToDeliverySection";
import ContinueToSetupSection from "./quote/ContinueToSetupSection";
import SetupSection from "./quote/SetupSection";
import FormActions from "./quote/FormActions";
import { useQuoteState } from "@/hooks/useQuoteState";

const QuoteCalculator = () => {
  const {
    stageDimensions,
    selectedServices,
    isServicesOpen,
    isDeliveryOpen,
    deliveryOption,
    continueToDelivery,
    continueToSetup,
    isSetupOpen,
    warehouseLocation,
    deliveryZipCode,
    handleDimensionUpdate,
    handleToggleService,
    handleResetForm,
    setIsServicesOpen,
    setIsDeliveryOpen,
    setDeliveryOption,
    setContinueToDelivery,
    setContinueToSetup,
    setIsSetupOpen,
    setWarehouseLocation,
    setDeliveryZipCode,
  } = useQuoteState();

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
            onContinueToDeliveryChange={(value) => {
              setContinueToDelivery(value);
              if (value === "no") {
                setDeliveryOption(null);
                setWarehouseLocation(null);
                setDeliveryZipCode(null);
              }
            }}
          />

          {continueToDelivery === "yes" && (
            <DeliveryForm
              isOpen={isDeliveryOpen}
              onOpenChange={setIsDeliveryOpen}
              deliveryOption={deliveryOption}
              onDeliveryOptionChange={(value) => {
                setDeliveryOption(value);
                if (value === "delivery") {
                  setWarehouseLocation(null);
                  setDeliveryZipCode(null);
                } else if (value === "pickup") {
                  setDeliveryZipCode(null);
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
              deliveryOption={deliveryOption}
            />
            <FormActions onResetForm={handleResetForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;