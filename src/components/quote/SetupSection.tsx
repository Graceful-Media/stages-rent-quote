
import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface SetupSectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setupCost: number;
  onSetupCostChange: (value: number) => void;
}

const SetupSection = ({ isOpen, onOpenChange, setupCost, onSetupCostChange }: SetupSectionProps) => {
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onSetupCostChange(value);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="border rounded-lg p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-quote-primary">Set Up Quote</h2>
          <ChevronDown className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4 space-y-4">
            <p>Set up quote is pending final layout, production schedule, and labor requirements. It is subject to change. We will notify you prior to confirmation.</p>
            <div className="space-y-2">
              <Label htmlFor="setup-cost">Setup Cost ($)</Label>
              <Input
                id="setup-cost"
                type="number"
                min="0"
                step="0.01"
                value={setupCost || ''}
                onChange={handleCostChange}
                placeholder="Enter setup cost"
                className="max-w-xs"
              />
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default SetupSection;
