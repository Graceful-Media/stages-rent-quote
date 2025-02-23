
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
  deliveryDetails?: {
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
  pickupDetails?: {
    warehouseLocation: "nj" | "ny" | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    comments: string;
  };
}

const Sidebar = ({
  stageDimensions,
  selectedServices,
  warehouseLocation,
  deliveryOption,
  handleResetForm,
  quoteData,
  setupCost,
  deliveryDetails,
  pickupDetails,
}: SidebarProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="space-y-6">
        <PriceSummary
          {...stageDimensions}
          selectedServices={selectedServices}
          warehouseLocation={warehouseLocation}
          deliveryOption={deliveryOption}
          setupCost={setupCost}
        />
        <FormActions 
          onResetForm={handleResetForm} 
          quoteData={quoteData}
          deliveryOption={deliveryOption}
          deliveryDetails={deliveryDetails}
          pickupDetails={pickupDetails}
          warehouseLocation={warehouseLocation}
        />
      </div>
    </div>
  );
};

export default Sidebar;
