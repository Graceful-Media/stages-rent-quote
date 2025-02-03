import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DeliveryDateTimeSectionProps {
  deliveryDate: Date | null;
  deliveryTime: string | null;
  pickupDate: Date | null;
  pickupTime: string | null;
  onDeliveryDateChange: (date: Date | null) => void;
  onDeliveryTimeChange: (time: string) => void;
  onPickupDateChange: (date: Date | null) => void;
  onPickupTimeChange: (time: string) => void;
}

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute of ['00', '30']) {
      const hourStr = hour.toString().padStart(2, '0');
      times.push(`${hourStr}:${minute}`);
    }
  }
  return times;
};

const DeliveryDateTimeSection = ({
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
  onDeliveryDateChange,
  onDeliveryTimeChange,
  onPickupDateChange,
  onPickupTimeChange,
}: DeliveryDateTimeSectionProps) => {
  const timeOptions = generateTimeOptions();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Delivery Date & Time</Label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !deliveryDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deliveryDate ? format(deliveryDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deliveryDate || undefined}
                onSelect={onDeliveryDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select
            value={deliveryTime || ""}
            onValueChange={onDeliveryTimeChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {deliveryTime || "Select time"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Pick Up Date & Time</Label>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDate || undefined}
                onSelect={onPickupDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select
            value={pickupTime || ""}
            onValueChange={onPickupTimeChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {pickupTime || "Select time"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeOptions.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDateTimeSection;