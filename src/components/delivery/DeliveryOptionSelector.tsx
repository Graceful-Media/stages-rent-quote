
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface DeliveryOptionSelectorProps {
  deliveryOption: "delivery" | "pickup" | null;
  onDeliveryOptionChange: (value: "delivery" | "pickup") => void;
  highlight?: boolean;
}

const DeliveryOptionSelector = ({
  deliveryOption,
  onDeliveryOptionChange,
  highlight = false,
}: DeliveryOptionSelectorProps) => {
  return (
    <div className={cn(
      "space-y-4 p-4 rounded-lg transition-all duration-300",
      highlight && !deliveryOption && "bg-red-50 border-2 border-red-300 animate-pulse"
    )}>
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
