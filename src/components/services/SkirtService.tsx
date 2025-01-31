import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { skirtSides } from "./types";

interface SkirtServiceProps {
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  selectedSides: string[];
  onSideToggle: (side: string) => void;
}

const SkirtService = ({ 
  isSelected, 
  onToggle, 
  selectedSides,
  onSideToggle 
}: SkirtServiceProps) => {
  console.log("Selected skirt sides:", selectedSides);

  return (
    <div className="space-y-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
      <div className="flex items-start space-x-4">
        <Checkbox
          id="skirt"
          checked={isSelected}
          onCheckedChange={() => onToggle("skirt")}
        />
        <div className="space-y-1">
          <Label
            htmlFor="skirt"
            className="text-lg font-medium cursor-pointer"
          >
            Stage Skirt
          </Label>
          <p className="text-sm text-gray-600">Professional stage skirting ($3/linear ft)</p>
        </div>
      </div>

      {isSelected && (
        <div className="ml-6 mt-2 grid grid-cols-2 gap-2">
          {skirtSides.map((side) => (
            <div key={side.id} className="flex items-center space-x-2">
              <Checkbox
                id={`skirt-${side.id}`}
                checked={selectedSides.includes(side.id)}
                onCheckedChange={() => onSideToggle(side.id)}
              />
              <Label htmlFor={`skirt-${side.id}`}>{side.name}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkirtService;