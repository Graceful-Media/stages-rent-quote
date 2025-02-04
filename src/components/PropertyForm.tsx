import React from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyFormProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  startDate: Date | null;
  endDate: Date | null;
  onUpdate: (field: string, value: number) => void;
  onDateChange: (type: 'start' | 'end', date: Date | null) => void;
}

const PropertyForm = ({ 
  width, 
  depth, 
  height, 
  days, 
  startDate,
  endDate,
  onUpdate,
  onDateChange,
}: PropertyFormProps) => {
  const validateDimension = (value: number, dimension: string) => {
    if (value && value % 4 !== 0) {
      toast.error(`${dimension} must be divisible by 4 feet`);
      return false;
    }
    return true;
  };

  const dimensionOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 4);
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
          <Label>Rental Duration (Days)</Label>
          <div className="h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
            {days}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={(date) => onDateChange('start', date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={(date) => onDateChange('end', date)}
                disabled={(date) =>
                  startDate ? date < startDate : false
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;