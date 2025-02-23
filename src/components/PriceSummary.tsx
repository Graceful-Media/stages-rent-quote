import React from "react";
import DimensionsDisplay from "./price-summary/DimensionsDisplay";
import SectionsDisplay from "./price-summary/SectionsDisplay";
import DailyCharges from "./price-summary/DailyCharges";
import OneTimeCharges from "./price-summary/OneTimeCharges";
import TotalDisplay from "./price-summary/TotalDisplay";
import { 
  calculateSections, 
  calculateTotalLegs, 
  calculateTotal,
  calculateSkirtPrice,
  calculateRailsPrice 
} from "@/utils/priceCalculations";

interface PriceSummaryProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  selectedServices: string[];
  warehouseLocation?: "nj" | "ny" | null;
  deliveryZipCode?: string | null;
  deliveryOption?: "delivery" | "pickup" | null;
  setupCost?: number;
}

const PriceSummary = ({
  width,
  depth,
  height,
  days,
  selectedServices,
  warehouseLocation,
  deliveryZipCode,
  deliveryOption,
  setupCost = 0,
}: PriceSummaryProps) => {
  const sections = calculateSections(width, depth);
  const totalLegs = calculateTotalLegs(width, depth);
  const totals = calculateTotal(width, depth, days, selectedServices, warehouseLocation, deliveryZipCode, deliveryOption, setupCost);

  const hasDelivery = deliveryOption === "delivery";
  const hasSetup = setupCost > 0;
  const hasCarpet = selectedServices.some(service => service.includes("carpet"));
  const hasWarehouseFee = warehouseLocation === "ny";

  const getServiceLabel = (serviceId: string) => {
    return {
      name: serviceId,
      price: 0
    };
  };

  const priceDetails = {
    dailyCosts: totals.dailyCosts,
    oneTimetCosts: totals.oneTimetCosts,
    totalCost: totals.totalCost,
    hasDelivery,
    hasSetup,
    hasCarpet,
    hasWarehouseFee
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-quote-primary mb-4">Price Summary</h3>
      <div className="space-y-3">
        <DimensionsDisplay 
          width={width} 
          depth={depth} 
          height={height} 
          days={days}
        />
        
        <SectionsDisplay 
          sections4x8={sections.sections4x8}
          sections4x4={sections.sections4x4}
          sections2x8={sections.sections2x8}
          sections8x2={sections.sections8x2}
          sections2x6={sections.sections2x6}
          sections6x2={sections.sections6x2}
          sections2x4={sections.sections2x4}
          sections4x2={sections.sections4x2}
          sections2x2={sections.sections2x2}
          totalLegs={totalLegs}
          width={width}
          depth={depth}
        />

        <div className="border-t pt-3">
          <DailyCharges 
            sections4x8={sections.sections4x8}
            sections4x4={sections.sections4x4}
            sections2x8={sections.sections2x8}
            sections8x2={sections.sections8x2}
            sections2x6={sections.sections2x6}
            sections6x2={sections.sections6x2}
            sections2x4={sections.sections2x4}
            sections4x2={sections.sections4x2}
            sections2x2={sections.sections2x2}
            selectedServices={selectedServices}
            getServiceLabel={getServiceLabel}
            dailyCosts={totals.dailyCosts}
          />
          
          <OneTimeCharges 
            selectedServices={selectedServices}
            width={width}
            depth={depth}
            warehouseLocation={warehouseLocation}
            deliveryFee={totals.deliveryFee}
            setupCost={setupCost}
          />
        </div>

        <TotalDisplay {...priceDetails} />
      </div>
    </div>
  );
};

export default PriceSummary;
