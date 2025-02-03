import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface DeliveryOptionSelectorProps {
  deliveryOption: "delivery" | "pickup" | null;
  onDeliveryOptionChange: (value: "delivery" | "pickup") => void;
}

const DeliveryOptionSelector = ({
  deliveryOption,
  onDeliveryOptionChange,
}: DeliveryOptionSelectorProps) => {
  return (
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
  );
};

export default DeliveryOptionSelector;