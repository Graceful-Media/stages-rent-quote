import React from "react";

interface DeliveryDetails {
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
}

interface PickupDetails {
  warehouseLocation: "nj" | "ny" | null;
  pickupDate: Date | null;
  returnDate: Date | null;
  comments: string;
}

export const useDeliveryFormState = (
  deliveryOption: "delivery" | "pickup" | null,
  onWarehouseLocationChange: (location: "nj" | "ny" | null) => void
) => {
  const [deliveryDetails, setDeliveryDetails] = React.useState<DeliveryDetails>({
    deliveryDate: null,
    deliveryTime: null,
    pickupDate: null,
    pickupTime: null,
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

  // Reset pickup details when switching to delivery mode
  React.useEffect(() => {
    if (deliveryOption === "delivery") {
      setPickupDetails(prev => ({
        ...prev,
        warehouseLocation: null,
        pickupDate: null,
        returnDate: null,
        comments: "",
      }));
      onWarehouseLocationChange(null);
    }
  }, [deliveryOption, onWarehouseLocationChange]);

  // Update warehouse location when it changes
  React.useEffect(() => {
    onWarehouseLocationChange(pickupDetails.warehouseLocation);
  }, [pickupDetails.warehouseLocation, onWarehouseLocationChange]);

  return {
    deliveryDetails,
    setDeliveryDetails,
    pickupDetails,
    setPickupDetails,
  };
};