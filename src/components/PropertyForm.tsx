import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface PropertyFormProps {
  width: number;
  depth: number;
  height: number;
  onUpdate: (field: string, value: number) => void;
}

const PropertyForm = ({ width, depth, height, onUpdate }: PropertyFormProps) => {
  const validateDimension = (value: number, dimension: string) => {
    if (value % 4 !== 0) {
      toast.error(`${dimension} must be divisible by 4 feet`);
      return false;
    }
    return true;
  };

  const handleDimensionChange = (field: string, value: number) => {
    if (validateDimension(value, field.charAt(0).toUpperCase() + field.slice(1))) {
      onUpdate(field, value);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Stage Dimensions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="width">Width (ft)</Label>
          <Input
            id="width"
            type="number"
            min="4"
            step="4"
            value={width}
            onChange={(e) => handleDimensionChange("width", parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">Must be divisible by 4</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth (ft)</Label>
          <Input
            id="depth"
            type="number"
            min="4"
            step="4"
            value={depth}
            onChange={(e) => handleDimensionChange("depth", parseInt(e.target.value) || 0)}
            className="w-full"
          />
          <p className="text-xs text-gray-500">Must be divisible by 4</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (ft)</Label>
          <Input
            id="height"
            type="number"
            min="1"
            value={height}
            onChange={(e) => onUpdate("height", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;