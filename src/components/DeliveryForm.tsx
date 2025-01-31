import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

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
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Stage delivery prices start at $500 (round-trip) based on location and size order.
                </p>
              </div>
            )}

            {deliveryOption === "pickup" && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-quote-primary mb-2">Warehouse Will Call</h3>
                <p className="text-gray-700">
                  Certificate Of Insurance (COI) Required from customer warehouse pick up - {" "}
                  <a 
                    href="https://www.etcrental.com/insurance-security/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-quote-accent hover:underline"
                  >
                    COI POLICY
                  </a>
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default DeliveryForm;