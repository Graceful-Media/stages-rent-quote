import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Service } from "./types";

interface StairsServiceProps {
  service: Service;
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
}

const StairsService = ({ service, isSelected, onToggle }: StairsServiceProps) => {
  return (
    <div className="flex items-start space-x-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
      <Checkbox
        id={service.id}
        checked={isSelected}
        onCheckedChange={() => onToggle(service.id)}
      />
      <div className="space-y-1">
        <Label
          htmlFor={service.id}
          className="text-lg font-medium cursor-pointer"
        >
          {service.name}
        </Label>
        <p className="text-sm text-gray-600">{service.description}</p>
      </div>
    </div>
  );
};

export default StairsService;