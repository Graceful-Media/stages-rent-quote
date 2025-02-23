
import { useState } from "react";

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

export const useQuoteState = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
    days: 1,
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup" | null>(null);
  const [continueToDelivery, setContinueToDelivery] = useState<"yes" | "no" | null>(null);
  const [continueToSetup, setContinueToSetup] = useState<"yes" | "no" | null>(null);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [setupCost, setSetupCost] = useState(0);
  const [warehouseLocation, setWarehouseLocation] = useState<"nj" | "ny" | null>(null);
  const [deliveryZipCode, setDeliveryZipCode] = useState<string | null>(null);

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
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

  const [pickupDetails, setPickupDetails] = useState<PickupDetails>({
    warehouseLocation: null,
    pickupDate: null,
    returnDate: null,
    comments: "",
  });

  const handleDimensionUpdate = (field: string, value: number) => {
    setStageDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleResetForm = () => {
    setStageDimensions({ width: 0, depth: 0, height: 0, days: 1 });
    setSelectedServices([]);
    setDeliveryOption(null);
    setContinueToDelivery(null);
    setContinueToSetup(null);
    setWarehouseLocation(null);
    setDeliveryZipCode(null);
    setSetupCost(0);
    setDeliveryDetails({
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
    setPickupDetails({
      warehouseLocation: null,
      pickupDate: null,
      returnDate: null,
      comments: "",
    });
  };

  return {
    stageDimensions,
    selectedServices,
    isServicesOpen,
    isDeliveryOpen,
    deliveryOption,
    continueToDelivery,
    continueToSetup,
    isSetupOpen,
    setupCost,
    warehouseLocation,
    deliveryZipCode,
    deliveryDetails,
    pickupDetails,
    handleDimensionUpdate,
    handleToggleService,
    handleResetForm,
    setIsServicesOpen,
    setIsDeliveryOpen,
    setDeliveryOption,
    setContinueToDelivery,
    setContinueToSetup,
    setIsSetupOpen,
    setSetupCost,
    setWarehouseLocation,
    setDeliveryZipCode,
    setDeliveryDetails,
    setPickupDetails,
  };
};
