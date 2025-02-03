import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import DeliveryDateTimeSection from "./DeliveryDateTimeSection";
import AddressSection from "./AddressSection";

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

const DeliveryDetailsForm = ({
  deliveryDetails,
  setDeliveryDetails,
  onZipCodeChange,
}: DeliveryDetailsFormProps) => {
  const handleZipCodeChange = (zipCode: string) => {
    setDeliveryDetails(prev => ({ ...prev, zipCode }));
    onZipCodeChange?.(zipCode);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-4">
        <p className="text-gray-700">
          Stage delivery prices start at $500 (round-trip) based on location and size order.
        </p>
      </div>

      <DeliveryDateTimeSection
        deliveryDate={deliveryDetails.deliveryDate}
        deliveryTime={deliveryDetails.deliveryTime}
        pickupDate={deliveryDetails.pickupDate}
        pickupTime={deliveryDetails.pickupTime}
        onDeliveryDateChange={(date) => setDeliveryDetails(prev => ({ ...prev, deliveryDate: date }))}
        onDeliveryTimeChange={(time) => setDeliveryDetails(prev => ({ ...prev, deliveryTime: time }))}
        onPickupDateChange={(date) => setDeliveryDetails(prev => ({ ...prev, pickupDate: date }))}
        onPickupTimeChange={(time) => setDeliveryDetails(prev => ({ ...prev, pickupTime: time }))}
      />

      <AddressSection
        venueName={deliveryDetails.venueName}
        addressLine1={deliveryDetails.addressLine1}
        addressLine2={deliveryDetails.addressLine2}
        city={deliveryDetails.city}
        state={deliveryDetails.state}
        zipCode={deliveryDetails.zipCode}
        onVenueNameChange={(value) => setDeliveryDetails(prev => ({ ...prev, venueName: value }))}
        onAddressLine1Change={(value) => setDeliveryDetails(prev => ({ ...prev, addressLine1: value }))}
        onAddressLine2Change={(value) => setDeliveryDetails(prev => ({ ...prev, addressLine2: value }))}
        onCityChange={(value) => setDeliveryDetails(prev => ({ ...prev, city: value }))}
        onStateChange={(value) => setDeliveryDetails(prev => ({ ...prev, state: value }))}
        onZipCodeChange={handleZipCodeChange}
      />

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