import React from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface DeliveryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  deliveryOption: "delivery" | "pickup" | null;
  onDeliveryOptionChange: (value: "delivery" | "pickup") => void;
}

interface DeliveryDetails {
  deliveryDate: Date | null;
  pickupDate: Date | null;
  venueName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  comments: string;
}

interface PickupDetails {
  warehouseLocation: "nj" | "ny" | null;
  pickupDate: Date | null;
  returnDate: Date | null;
  comments: string;
}

const DeliveryForm = ({
  isOpen,
  onOpenChange,
  deliveryOption,
  onDeliveryOptionChange,
}: DeliveryFormProps) => {
  const [deliveryDetails, setDeliveryDetails] = React.useState<DeliveryDetails>({
    deliveryDate: null,
    pickupDate: null,
    venueName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    comments: "",
  });

  const [pickupDetails, setPickupDetails] = React.useState<PickupDetails>({
    warehouseLocation: null,
    pickupDate: null,
    returnDate: null,
    comments: "",
  });

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onOpenChange}>
      <div className="border rounded-lg p-4">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-2xl font-semibold text-quote-primary">Delivery / Pick Up</h2>
          <ChevronDown className={`h-6 w-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-6 pt-4">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Do you need delivery?</h3>
              <RadioGroup 
                value={deliveryOption || ""} 
                onValueChange={(value) => onDeliveryOptionChange(value as "delivery" | "pickup")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Label htmlFor="delivery">YES, provide quote for delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">NO, I will pick up from your warehouse (COI Required)</Label>
                </div>
              </RadioGroup>
            </div>

            {deliveryOption === "delivery" && (
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-gray-700">
                    Stage delivery prices start at $500 (round-trip) based on location and size order.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Delivery Date */}
                  <div className="space-y-2">
                    <Label>Delivery Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
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
                  </div>

                  {/* Pickup Date */}
                  <div className="space-y-2">
                    <Label>Pick Up Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
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
                        onChange={(e) => setDeliveryDetails(prev => ({ ...prev, zipCode: e.target.value }))}
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
            )}

            {deliveryOption === "pickup" && (
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
                  <Label>Select Warehouse Location</Label>
                  <Select
                    value={pickupDetails.warehouseLocation || ""}
                    onValueChange={(value: "nj" | "ny") => 
                      setPickupDetails(prev => ({ ...prev, warehouseLocation: value }))
                    }
                  >
                    <SelectTrigger>
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

                {/* Pick Up and Return Dates in 2 columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Pick Up Date */}
                  <div className="space-y-2">
                    <Label>Pick Up Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
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
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
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
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
};

export default DeliveryForm;