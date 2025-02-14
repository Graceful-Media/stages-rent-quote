
import React from "react";
import PropertyForm from "../PropertyForm";
import ServicesForm from "../ServicesForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import ContinueToDeliverySection from "./ContinueToDeliverySection";
import ContinueToSetupSection from "./ContinueToSetupSection";
import SetupSection from "./SetupSection";
import DeliveryForm from "../DeliveryForm";

interface MainContentProps {
  stageDimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  isServicesOpen: boolean;
  isDeliveryOpen: boolean;
  deliveryOption: "delivery" | "pickup" | null;
  continueToDelivery: "yes" | "no" | null;
  continueToSetup: "yes" | "no" | null;
  isSetupOpen: boolean;
  selectedServices: string[];
  handleDimensionUpdate: (field: string, value: number) => void;
  handleToggleService: (serviceId: string) => void;
  setIsServicesOpen: (open: boolean) => void;
  setIsDeliveryOpen: (open: boolean) => void;
  setDeliveryOption: (option: "delivery" | "pickup" | null) => void;
  setContinueToDelivery: (value: "yes" | "no") => void;
  setContinueToSetup: (value: "yes" | "no") => void;
  setIsSetupOpen: (open: boolean) => void;
  setWarehouseLocation: (location: "nj" | "ny" | null) => void;
  setDeliveryZipCode: (zipCode: string | null) => void;
  warehouseLocation: "nj" | "ny" | null;
  deliveryZipCode: string | null;
  setupCost: number;
  setSetupCost: (value: number) => void;
}

const MainContent = ({
  stageDimensions,
  isServicesOpen,
  isDeliveryOpen,
  deliveryOption,
  continueToDelivery,
  continueToSetup,
  isSetupOpen,
  selectedServices,
  handleDimensionUpdate,
  handleToggleService,
  setIsServicesOpen,
  setIsDeliveryOpen,
  setDeliveryOption,
  setContinueToDelivery,
  setContinueToSetup,
  setIsSetupOpen,
  setWarehouseLocation,
  setDeliveryZipCode,
  warehouseLocation,
  deliveryZipCode,
  setupCost,
  setSetupCost,
}: MainContentProps) => {
  // Reset setup options when switching to pickup
  React.useEffect(() => {
    if (deliveryOption === "pickup") {
      setContinueToSetup("no");
      setSetupCost(0);
    }
  }, [deliveryOption, setContinueToSetup, setSetupCost]);

  return (
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

      {/* Only show setup section if not pickup */}
      {continueToDelivery === "yes" && deliveryOption !== "pickup" && (
        <>
          <ContinueToSetupSection
            continueToSetup={continueToSetup}
            onContinueToSetupChange={(value) => setContinueToSetup(value)}
          />

          {continueToSetup === "yes" && (
            <SetupSection
              isOpen={isSetupOpen}
              onOpenChange={setIsSetupOpen}
              setupCost={setupCost}
              onSetupCostChange={setSetupCost}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MainContent;
