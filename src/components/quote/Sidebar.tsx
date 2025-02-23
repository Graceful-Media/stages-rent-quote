
import React from "react";
import PriceSummary from "../PriceSummary";
import FormActions from "./FormActions";

interface SidebarProps {
  stageDimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  warehouseLocation: "nj" | "ny" | null;
  deliveryZipCode: string | null;
  deliveryOption: "delivery" | "pickup" | null;
  handleResetForm: () => void;
  quoteData: {
    dimensions: {
      width: number;
      depth: number;
      height: number;
      days: number;
    };
    selectedServices: string[];
    totalCost: number;
    dailyCosts: number;
    oneTimetCosts: number;
    hasDelivery: boolean;
    hasSetup: boolean;
    hasCarpet: boolean;
    hasWarehouseFee: boolean;
  };
  setupCost: number;
}

const Sidebar = ({
  stageDimensions,
  selectedServices,
  warehouseLocation,
  deliveryZipCode,
  deliveryOption,
  handleResetForm,
  quoteData,
  setupCost,
}: SidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <PriceSummary
          {...stageDimensions}
          selectedServices={selectedServices}
          warehouseLocation={warehouseLocation}
          deliveryZipCode={deliveryZipCode}
          deliveryOption={deliveryOption}
          setupCost={setupCost}
        />
        <FormActions 
          onResetForm={handleResetForm} 
          quoteData={quoteData}
          deliveryOption={deliveryOption}
          deliveryZipCode={deliveryZipCode}
          warehouseLocation={warehouseLocation}
        />
      </div>
    </div>
  );
};

export default Sidebar;
