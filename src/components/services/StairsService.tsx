
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Service } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StairsServiceProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  quantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const StairsService = ({ 
  service, 
  isSelected, 
  onToggle,
  quantity = 1,
  onQuantityChange 
}: StairsServiceProps) => {
  const quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleToggle = () => {
    // If it's selected and we're turning it off, remove the quantity suffix
    if (isSelected) {
      const baseServiceId = service.id.split('-qty-')[0];
      onToggle(baseServiceId);
    } else {
      // If we're turning it on, add the quantity
      onToggle(`${service.id}-qty-${quantity}`);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
      // Update the service ID with new quantity
      const baseServiceId = service.id.split('-qty-')[0];
      onToggle(`${baseServiceId}-qty-${newQuantity}`);
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
      <Checkbox
        id={service.id}
        checked={isSelected}
        onCheckedChange={() => handleToggle()}
      />
      <div className="space-y-1 flex-grow">
        <Label
          htmlFor={service.id}
          className="text-lg font-medium cursor-pointer"
        >
          {service.name}
        </Label>
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
      {isSelected && onQuantityChange && (
        <div className="w-24">
          <Select
            value={quantity.toString()}
            onValueChange={(value) => handleQuantityChange(parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Quantity" />
            </SelectTrigger>
            <SelectContent>
              {quantityOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default StairsService;
