import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { carpetColors } from "./types";

interface CarpetServiceProps {
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  onColorChange: (colorId: string, price: number) => void;
  selectedColor: string;
}

const CarpetService = ({ 
  isSelected, 
  onToggle, 
  onColorChange, 
  selectedColor 
}: CarpetServiceProps) => {
  const [customColor, setCustomColor] = useState("");

  const handleColorChange = (colorId: string) => {
    const color = carpetColors.find(c => c.id === colorId);
    if (color) {
      onColorChange(colorId, color.price);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
      <div className="flex items-start space-x-4">
        <Checkbox
          id="carpet"
          checked={isSelected}
          onCheckedChange={() => onToggle("carpet")}
        />
        <div className="space-y-1">
          <Label
            htmlFor="carpet"
            className="text-lg font-medium cursor-pointer"
          >
            Carpet
          </Label>
          <p className="text-sm text-gray-600">Add carpet to your stage</p>
        </div>
      </div>

      {isSelected && (
        <div className="ml-8 space-y-4">
          <RadioGroup
            value={selectedColor}
            onValueChange={handleColorChange}
            className="space-y-2"
          >
            {carpetColors.map((color) => (
              <div key={color.id} className="flex items-center space-x-2">
                <RadioGroupItem value={color.id} id={`color-${color.id}`} />
                <Label htmlFor={`color-${color.id}`}>
                  {color.name}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {selectedColor === "other" && (
            <div className="space-y-2">
              <Label htmlFor="custom-color">Specify Color:</Label>
              <Input
                id="custom-color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="Enter desired color"
                className="max-w-xs"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarpetService;