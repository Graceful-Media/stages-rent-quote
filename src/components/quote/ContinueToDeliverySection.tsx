import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface ContinueToDeliverySectionProps {
  continueToDelivery: "yes" | "no" | null;
  onContinueToDeliveryChange: (value: "yes" | "no") => void;
}

const ContinueToDeliverySection = ({
  continueToDelivery,
  onContinueToDeliveryChange,
}: ContinueToDeliverySectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Continue to Quote Delivery?</h3>
      <div className="text-sm text-gray-600 space-y-1">
        <p>We service NYC, NJ, PA, CT areas</p>
        <p>Our warehousing is out of NJ & Brooklyn</p>
      </div>
      <RadioGroup 
        value={continueToDelivery || ""} 
        onValueChange={(value) => onContinueToDeliveryChange(value as "yes" | "no")}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="continue-yes" />
          <Label htmlFor="continue-yes">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="continue-no" />
          <Label htmlFor="continue-no">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ContinueToDeliverySection;