import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import DeliveryDetailsForm from "./delivery/DeliveryDetailsForm";
import PickupDetailsForm from "./delivery/PickupDetailsForm";

interface DeliveryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryOption: "delivery" | "pickup" | null;
  onDeliveryOptionChange: (value: "delivery" | "pickup") => void;
}

const DeliveryForm = ({
  isOpen,
  onOpenChange,
  deliveryOption,
  onDeliveryOptionChange,
}: DeliveryFormProps) => {
  const [deliveryDetails, setDeliveryDetails] = React.useState({
    deliveryDate: null,
    pickupDate: null,
    venueName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    comments: "",
  });

  const [pickupDetails, setPickupDetails] = React.useState({
    warehouseLocation: null,
    pickupDate: null,
    returnDate: null,
    comments: "",
  });

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="border rounded-lg p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-quote-primary">Delivery / Pick Up</h2>
          <ChevronDown className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Do you need delivery?</h3>
              <RadioGroup 
                value={deliveryOption || ""} 
                onValueChange={(value) => onDeliveryOptionChange(value as "delivery" | "pickup")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">YES, provide quote for delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">NO, I will pick up from your warehouse (COI Required)</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryOption === "delivery" && (
              <DeliveryDetailsForm
                deliveryDetails={deliveryDetails}
                setDeliveryDetails={setDeliveryDetails}
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