import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown } from "lucide-react";

interface SetupSectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetupSection = ({ isOpen, onOpenChange }: SetupSectionProps) => {
  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="border rounded-lg p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-quote-primary">Set Up Quote</h2>
          <ChevronDown className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">
            <p>Set up quote is pending final layout, production schedule, and labor requirements. It is subject to change. We will notify you prior to confirmation.</p>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default SetupSection;