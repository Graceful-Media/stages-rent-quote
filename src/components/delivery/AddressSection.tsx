import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface AddressSectionProps {
  venueName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  onVenueNameChange: (value: string) => void;
  onAddressLine1Change: (value: string) => void;
  onAddressLine2Change: (value: string) => void;
  onCityChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onZipCodeChange: (value: string) => void;
}

const AddressSection = ({
  venueName,
  addressLine1,
  addressLine2,
  city,
  state,
  zipCode,
  onVenueNameChange,
  onAddressLine1Change,
  onAddressLine2Change,
  onCityChange,
  onStateChange,
  onZipCodeChange,
}: AddressSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Venue Name (if applicable)</Label>
        <Input
          value={venueName}
          onChange={(e) => onVenueNameChange(e.target.value)}
          placeholder="Enter venue name"
        />
      </div>

      <div className="space-y-2">
        <Label>Address Line 1</Label>
        <Input
          value={addressLine1}
          onChange={(e) => onAddressLine1Change(e.target.value)}
          placeholder="Street address"
        />
      </div>

      <div className="space-y-2">
        <Label>Address Line 2</Label>
        <Input
          value={addressLine2}
          onChange={(e) => onAddressLine2Change(e.target.value)}
          placeholder="Apt, Suite, Unit, etc."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>City</Label>
          <Input
            value={city}
            onChange={(e) => onCityChange(e.target.value)}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label>State</Label>
          <Input
            value={state}
            onChange={(e) => onStateChange(e.target.value)}
            placeholder="State"
          />
        </div>
        <div className="space-y-2">
          <Label>ZIP Code</Label>
          <Input
            value={zipCode}
            onChange={(e) => onZipCodeChange(e.target.value)}
            placeholder="ZIP Code"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSection;