
import React from "react";
import { useQuoteState } from "@/hooks/useQuoteState";
import { calculateTotal } from "@/utils/priceCalculations";
import MainContent from "./quote/MainContent";
import Sidebar from "./quote/Sidebar";

const QuoteCalculator = () => {
  const {
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
  } = useQuoteState();

  const totals = calculateTotal(
    stageDimensions.width,
    stageDimensions.depth,
    stageDimensions.days,
    selectedServices,
    warehouseLocation,
    deliveryZipCode,
    deliveryOption,
    setupCost
  );

  const hasDelivery = deliveryOption === "delivery";
  const hasSetup = setupCost > 0;
  const hasCarpet = selectedServices.some(service => service.includes("carpet"));
  const hasWarehouseFee = warehouseLocation === "ny";

  const quoteData = {
    dimensions: stageDimensions,
    selectedServices,
    totalCost: totals.totalCost,
    dailyCosts: totals.dailyCosts,
    oneTimetCosts: totals.oneTimetCosts,
    hasDelivery,
    hasSetup,
    hasCarpet,
    hasWarehouseFee
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-quote-primary text-center mb-8">
        Get Your Stage Rental Quote
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MainContent
          stageDimensions={stageDimensions}
          isServicesOpen={isServicesOpen}
          isDeliveryOpen={isDeliveryOpen}
          deliveryOption={deliveryOption}
          continueToDelivery={continueToDelivery}
          continueToSetup={continueToSetup}
          isSetupOpen={isSetupOpen}
          selectedServices={selectedServices}
          handleDimensionUpdate={handleDimensionUpdate}
          handleToggleService={handleToggleService}
          setIsServicesOpen={setIsServicesOpen}
          setIsDeliveryOpen={setIsDeliveryOpen}
          setDeliveryOption={setDeliveryOption}
          setContinueToDelivery={setContinueToDelivery}
          setContinueToSetup={setContinueToSetup}
          setIsSetupOpen={setIsSetupOpen}
          setWarehouseLocation={setWarehouseLocation}
          setDeliveryZipCode={setDeliveryZipCode}
          warehouseLocation={warehouseLocation}
          deliveryZipCode={deliveryZipCode}
          setupCost={setupCost}
          setSetupCost={setSetupCost}
        />
        <Sidebar
          stageDimensions={stageDimensions}
          selectedServices={selectedServices}
          warehouseLocation={warehouseLocation}
          deliveryZipCode={deliveryZipCode}
          deliveryOption={deliveryOption}
          handleResetForm={handleResetForm}
          quoteData={quoteData}
          setupCost={setupCost}
        />
      </div>
    </div>
  );
};

export default QuoteCalculator;
