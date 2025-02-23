
import { useState } from "react";

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
  };
};
