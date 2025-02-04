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
  const [warehouseLocation, setWarehouseLocation] = useState<"nj" | "ny" | null>(null);
  const [deliveryZipCode, setDeliveryZipCode] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDimensionUpdate = (field: string, value: number) => {
    setStageDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (type: 'start' | 'end', date: Date | null) => {
    if (type === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    // Update days if both dates are set
    if (date && (type === 'start' ? endDate : startDate)) {
      const start = type === 'start' ? date : startDate!;
      const end = type === 'end' ? date : endDate!;
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      handleDimensionUpdate('days', diffDays);
    }
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
    setStartDate(null);
    setEndDate(null);
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
    warehouseLocation,
    deliveryZipCode,
    startDate,
    endDate,
    handleDimensionUpdate,
    handleToggleService,
    handleResetForm,
    handleDateChange,
    setIsServicesOpen,
    setIsDeliveryOpen,
    setDeliveryOption,
    setContinueToDelivery,
    setContinueToSetup,
    setIsSetupOpen,
    setWarehouseLocation,
    setDeliveryZipCode,
  };
};