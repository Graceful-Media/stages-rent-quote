import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PropertyFormProps {
  width: number;
  depth: number;
  height: number;
  onUpdate: (field: string, value: number) => void;
}

const PropertyForm = ({ width, depth, height, onUpdate }: PropertyFormProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Stage Dimensions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="width">Width (ft)</Label>
          <Input
            id="width"
            type="number"
            min="0"
            value={width}
            onChange={(e) => onUpdate("width", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth (ft)</Label>
          <Input
            id="depth"
            type="number"
            min="0"
            value={depth}
            onChange={(e) => onUpdate("depth", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height (ft)</Label>
          <Input
            id="height"
            type="number"
            min="0"
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