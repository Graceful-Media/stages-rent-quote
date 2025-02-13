
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
    setWarehouseLocation,
    setDeliveryZipCode,
    startDate,
    endDate,
  } = useQuoteState();

  const totals = calculateTotal(
    stageDimensions.width,
    stageDimensions.depth,
    stageDimensions.days,
    selectedServices,
    warehouseLocation,
    deliveryZipCode,
    deliveryOption,
    startDate,
    endDate
  );

  const quoteData = {
    dimensions: stageDimensions,
    selectedServices,
    totalCost: totals.totalCost,
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
        />
        <Sidebar
          stageDimensions={stageDimensions}
          selectedServices={selectedServices}
          warehouseLocation={warehouseLocation}
          deliveryZipCode={deliveryZipCode}
          deliveryOption={deliveryOption}
          handleResetForm={handleResetForm}
          quoteData={quoteData}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default QuoteCalculator;
