import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PropertyFormProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  onUpdate: (field: string, value: number) => void;
}

const PropertyForm = ({ bedrooms, bathrooms, sqft, onUpdate }: PropertyFormProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Property Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            min="0"
            value={bedrooms}
            onChange={(e) => onUpdate("bedrooms", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input
            id="bathrooms"
            type="number"
            min="0"
            step="0.5"
            value={bathrooms}
            onChange={(e) => onUpdate("bathrooms", parseFloat(e.target.value) || 0)}
            className="w-full"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="sqft">Square Footage</Label>
          <Input
            id="sqft"
            type="number"
            min="0"
            value={sqft}
            onChange={(e) => onUpdate("sqft", parseInt(e.target.value) || 0)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;