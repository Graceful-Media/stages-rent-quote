import React, { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import DeliveryDetailsForm from "./delivery/DeliveryDetailsForm";
import PickupDetailsForm from "./delivery/PickupDetailsForm";
import DeliveryOptionSelector from "./delivery/DeliveryOptionSelector";
import { useDeliveryFormState } from "@/hooks/useDeliveryFormState";
import { cn } from "@/lib/utils";

interface DeliveryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryOption: "delivery" | "pickup" | null;
  onDeliveryOptionChange: (value: "delivery" | "pickup") => void;
  onWarehouseLocationChange: (location: "nj" | "ny" | null) => void;
  onDeliveryZipCodeChange?: (zipCode: string) => void;
  highlight?: boolean;
}

const DeliveryForm = ({
  isOpen,
  onOpenChange,
  deliveryOption,
  onDeliveryOptionChange,
  onWarehouseLocationChange,
  onDeliveryZipCodeChange,
  highlight = false,
}: DeliveryFormProps) => {
  const {
    deliveryDetails,
    setDeliveryDetails,
    pickupDetails,
    setPickupDetails,
  } = useDeliveryFormState(deliveryOption, onWarehouseLocationChange);

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <Collapsible open={isOpen || highlight} onOpenChange={onOpenChange}>
      <div className="border rounded-lg p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className={cn(
            "text-2xl font-semibold",
            highlight && !deliveryOption ? "text-red-500" : "text-quote-primary"
          )}>
            Delivery / Pick Up
          </h2>
          <ChevronDown className={`h-6 w-6 transform transition-transform ${isOpen || highlight ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-6 pt-4">
            <DeliveryOptionSelector
              deliveryOption={deliveryOption}
              onDeliveryOptionChange={onDeliveryOptionChange}
              highlight={highlight}
            />

            {deliveryOption === "delivery" && (
              <DeliveryDetailsForm
                deliveryDetails={deliveryDetails}
                setDeliveryDetails={setDeliveryDetails}
                onZipCodeChange={onDeliveryZipCodeChange}
              />
            )}

            {deliveryOption === "pickup" && (
              <PickupDetailsForm
                pickupDetails={pickupDetails}
                setPickupDetails={setPickupDetails}
                isWeekday={isWeekday}
              />
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default DeliveryForm;
