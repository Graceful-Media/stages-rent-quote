import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface DeliveryDetailsFormProps {
  deliveryDetails: {
    deliveryDate: Date | null;
    deliveryTime: string | null;
    pickupDate: Date | null;
    pickupTime: string | null;
    venueName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    comments: string;
  };
  setDeliveryDetails: React.Dispatch<React.SetStateAction<{
    deliveryDate: Date | null;
    deliveryTime: string | null;
    pickupDate: Date | null;
    pickupTime: string | null;
    venueName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    comments: string;
  }>>;
  onZipCodeChange?: (zipCode: string) => void;
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

const DeliveryDetailsForm = ({
  deliveryDetails,
  setDeliveryDetails,
  onZipCodeChange,
}: DeliveryDetailsFormProps) => {
  const timeOptions = generateTimeOptions();

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZipCode = e.target.value;
    setDeliveryDetails(prev => ({ ...prev, zipCode: newZipCode }));
    onZipCodeChange?.(newZipCode);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">
          Stage delivery prices start at $500 (round-trip) based on location and size order.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Delivery Date and Time */}
        <div className="space-y-2">
          <Label>Delivery Date & Time</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !deliveryDetails.deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDetails.deliveryDate ? (
                    format(deliveryDetails.deliveryDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deliveryDetails.deliveryDate || undefined}
                  onSelect={(date) => setDeliveryDetails(prev => ({ ...prev, deliveryDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              value={deliveryDetails.deliveryTime || ""}
              onValueChange={(time) => setDeliveryDetails(prev => ({ ...prev, deliveryTime: time }))}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {deliveryDetails.deliveryTime || "Select time"}
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

        {/* Pickup Date and Time */}
        <div className="space-y-2">
          <Label>Pick Up Date & Time</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[180px] justify-start text-left font-normal",
                    !deliveryDetails.pickupDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDetails.pickupDate ? (
                    format(deliveryDetails.pickupDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deliveryDetails.pickupDate || undefined}
                  onSelect={(date) => setDeliveryDetails(prev => ({ ...prev, pickupDate: date }))}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select
              value={deliveryDetails.pickupTime || ""}
              onValueChange={(time) => setDeliveryDetails(prev => ({ ...prev, pickupTime: time }))}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time">
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {deliveryDetails.pickupTime || "Select time"}
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

      {/* Venue Name */}
      <div className="space-y-2">
        <Label>Venue Name (if applicable)</Label>
        <Input
          value={deliveryDetails.venueName}
          onChange={(e) => setDeliveryDetails(prev => ({ ...prev, venueName: e.target.value }))}
          placeholder="Enter venue name"
        />
      </div>

      {/* Address Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Address Line 1</Label>
          <Input
            value={deliveryDetails.addressLine1}
            onChange={(e) => setDeliveryDetails(prev => ({ ...prev, addressLine1: e.target.value }))}
            placeholder="Street address"
          />
        </div>
        <div className="space-y-2">
          <Label>Address Line 2</Label>
          <Input
            value={deliveryDetails.addressLine2}
            onChange={(e) => setDeliveryDetails(prev => ({ ...prev, addressLine2: e.target.value }))}
            placeholder="Apt, Suite, Unit, etc."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              value={deliveryDetails.city}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, city: e.target.value }))}
              placeholder="City"
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input
              value={deliveryDetails.state}
              onChange={(e) => setDeliveryDetails(prev => ({ ...prev, state: e.target.value }))}
              placeholder="State"
            />
          </div>
          <div className="space-y-2">
            <Label>ZIP Code</Label>
            <Input
              value={deliveryDetails.zipCode}
              onChange={handleZipCodeChange}
              placeholder="ZIP Code"
            />
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <Label>Comments, Notes, Information</Label>
        <Textarea
          value={deliveryDetails.comments}
          onChange={(e) => setDeliveryDetails(prev => ({ ...prev, comments: e.target.value }))}
          placeholder="Enter any additional information"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default DeliveryDetailsForm;
