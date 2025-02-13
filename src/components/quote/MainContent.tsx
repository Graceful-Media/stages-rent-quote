
import React, { useState, useEffect } from "react";
import PropertyForm from "../PropertyForm";
import ServicesForm from "../ServicesForm";
import DeliveryForm from "@/components/DeliveryForm";
import SetupSection from "@/components/quote/SetupSection";

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
  setIsServicesOpen: (isOpen: boolean) => void;
  setIsDeliveryOpen: (isOpen: boolean) => void;
  setDeliveryOption: (option: "delivery" | "pickup" | null) => void;
  setContinueToDelivery: (value: "yes" | "no" | null) => void;
  setContinueToSetup: (value: "yes" | "no" | null) => void;
  setIsSetupOpen: (isOpen: boolean) => void;
  setWarehouseLocation: (location: "nj" | "ny" | null) => void;
  setDeliveryZipCode: (zipCode: string | null) => void;
  warehouseLocation: "nj" | "ny" | null;
  deliveryZipCode: string | null;
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
}: MainContentProps) => {
  const [highlightDelivery, setHighlightDelivery] = useState(false);

  useEffect(() => {
    if (deliveryOption) {
      setHighlightDelivery(false);
    }
  }, [deliveryOption]);

  const handleEmailDialogOpen = (open: boolean) => {
    if (open && !deliveryOption) {
      setHighlightDelivery(true);
      setIsDeliveryOpen(true);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-6">
      <PropertyForm
        width={stageDimensions.width}
        depth={stageDimensions.depth}
        height={stageDimensions.height}
        days={stageDimensions.days}
        onUpdate={handleDimensionUpdate}
      />
      
      <ServicesForm
        selectedServices={selectedServices}
        onToggleService={handleToggleService}
        height={stageDimensions.height}
      />

      {continueToDelivery === "yes" && (
        <DeliveryForm
          isOpen={isDeliveryOpen}
          onOpenChange={setIsDeliveryOpen}
          deliveryOption={deliveryOption}
          onDeliveryOptionChange={setDeliveryOption}
          onWarehouseLocationChange={setWarehouseLocation}
          onDeliveryZipCodeChange={setDeliveryZipCode}
          highlight={highlightDelivery}
        />
      )}

      {continueToSetup === "yes" && (
        <SetupSection
          isOpen={isSetupOpen}
          onOpenChange={setIsSetupOpen}
        />
      )}
    </div>
  );
};

export default MainContent;
