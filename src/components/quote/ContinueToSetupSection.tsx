import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface ContinueToSetupSectionProps {
  continueToSetup: "yes" | "no" | null;
  onContinueToSetupChange: (value: "yes" | "no") => void;
}

const ContinueToSetupSection = ({
  continueToSetup,
  onContinueToSetupChange,
}: ContinueToSetupSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Continue to Quote Set Up?</h3>
      <RadioGroup 
        value={continueToSetup || ""} 
        onValueChange={(value) => onContinueToSetupChange(value as "yes" | "no")}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="setup-yes" />
          <Label htmlFor="setup-yes">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="setup-no" />
          <Label htmlFor="setup-no">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ContinueToSetupSection;