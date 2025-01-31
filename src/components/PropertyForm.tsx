import React from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PropertyFormProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  onUpdate: (field: string, value: number) => void;
}

const PropertyForm = ({ width, depth, height, days, onUpdate }: PropertyFormProps) => {
  const validateDimension = (value: number, dimension: string) => {
    if (value && value % 4 !== 0) {
      toast.error(`${dimension} must be divisible by 4 feet`);
      return false;
    }
    return true;
  };

  const dimensionOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 4);
  const dayOptions = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];

  const heightOptions = [
    { value: 6, label: "6\"" },
    { value: 8, label: "8\"" },
    { value: 12, label: "12\"" },
    { value: 16, label: "16\"" },
    { value: 24, label: "24\"" },
    { value: 32, label: "32\"" },
    { value: 36, label: "36\"" },
    { value: 40, label: "40\"" },
    { value: 48, label: "48\"" }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Stage Dimensions</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="width">Width (ft)</Label>
          <Select
            value={width ? width.toString() : ""}
            onValueChange={(value) => onUpdate("width", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select width" />
            </SelectTrigger>
            <SelectContent>
              {dimensionOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="depth">Depth (ft)</Label>
          <Select
            value={depth ? depth.toString() : ""}
            onValueChange={(value) => onUpdate("depth", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select depth" />
            </SelectTrigger>
            <SelectContent>
              {dimensionOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} ft
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="height">Height</Label>
          <Select
            value={height.toString()}
            onValueChange={(value) => onUpdate("height", parseInt(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select height" />
            </SelectTrigger>
            <SelectContent>
              {heightOptions.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="days">Rental Duration (Days)</Label>
          <Select
            value={days ? days.toString() : ""}
            onValueChange={(value) => onUpdate("days", parseFloat(value))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select days" />
            </SelectTrigger>
            <SelectContent>
              {dayOptions.map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value} {value === 1 ? "day" : "days"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;