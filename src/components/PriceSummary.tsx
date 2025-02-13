
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
          totalLegs={totalLegs}
          width={width}
          depth={depth}
        />

        <div className="border-t pt-3">
          <DailyCharges 
            selectedServices={selectedServices}
            height={height}
            width={width}
            depth={depth}
            calculateSkirtPrice={() => calculateSkirtPrice(selectedServices, width, depth)}
            calculateRailsPrice={() => calculateRailsPrice(selectedServices, width, depth)}
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

        <TotalDisplay 
          dailyCosts={totals.dailyCosts}
          oneTimetCosts={totals.oneTimetCosts}
          totalCost={totals.totalCost}
          hasDelivery={hasDelivery}
          hasSetup={hasSetup}
          hasCarpet={hasCarpet}
          hasWarehouseFee={hasWarehouseFee}
        />
      </div>
    </div>
  );
};

export default PriceSummary;
