
import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

interface PickupDetailsFormProps {
  pickupDetails: {
    warehouseLocation: "nj" | "ny" | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    comments: string;
  };
  setPickupDetails: React.Dispatch<React.SetStateAction<{
    warehouseLocation: "nj" | "ny" | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    comments: string;
  }>>;
  isWeekday: (date: Date) => boolean;
}

const PickupDetailsForm = ({
  pickupDetails,
  setPickupDetails,
  isWeekday,
}: PickupDetailsFormProps) => {
  // Add validation check
  React.useEffect(() => {
    if (!pickupDetails.warehouseLocation) {
      toast.error("Please select a warehouse location");
    }
  }, [pickupDetails.warehouseLocation]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-quote-primary mb-2">Warehouse Will Call</h3>
        <p className="text-gray-700">
          Certificate Of Insurance (COI) Required from customer warehouse pick up - {" "}
          <a 
            href="https://www.etcrental.com/insurance-security/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-quote-accent hover:underline"
          >
            COI POLICY
          </a>
        </p>
      </div>

      {/* Warehouse Location */}
      <div className="space-y-2">
        <Label className="flex items-center">
          Select Warehouse Location
          <span className="text-red-500 ml-1">*</span>
        </Label>
        <Select
          value={pickupDetails.warehouseLocation || ""}
          onValueChange={(value: "nj" | "ny") => 
            setPickupDetails(prev => ({ ...prev, warehouseLocation: value }))
          }
        >
          <SelectTrigger className={cn(
            !pickupDetails.warehouseLocation && "border-red-500"
          )}>
            <SelectValue placeholder="Select a warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nj">
              NJ, North Bergen - No Fees - Limited Hours - Mon-Fri 10am-5pm
            </SelectItem>
            <SelectItem value="ny">
              NY, Brooklyn - $50 Warehouse Prep Fee - Mon-Fri 10am-5pm
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pick Up and Return Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pick Up Date */}
        <div className="space-y-2">
          <Label className="flex items-center">
            Pick Up Date
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDetails.pickupDate && "border-red-500",
                  !pickupDetails.pickupDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDetails.pickupDate ? (
                  format(pickupDetails.pickupDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDetails.pickupDate || undefined}
                onSelect={(date) => setPickupDetails(prev => ({ ...prev, pickupDate: date }))}
                disabled={(date) => !isWeekday(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Return Date */}
        <div className="space-y-2">
          <Label className="flex items-center">
            Return Date
            <span className="text-red-500 ml-1">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !pickupDetails.returnDate && "border-red-500",
                  !pickupDetails.returnDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {pickupDetails.returnDate ? (
                  format(pickupDetails.returnDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={pickupDetails.returnDate || undefined}
                onSelect={(date) => setPickupDetails(prev => ({ ...prev, returnDate: date }))}
                disabled={(date) => !isWeekday(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <Label>Comments, Notes, Information</Label>
        <Textarea
          value={pickupDetails.comments}
          onChange={(e) => setPickupDetails(prev => ({ ...prev, comments: e.target.value }))}
          placeholder="Enter any additional information"
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default PickupDetailsForm;
