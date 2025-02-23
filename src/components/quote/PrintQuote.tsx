
import React from "react";
import { format, addDays } from "date-fns";
import { carpetColors, baseServices, getStairServices, skirtSides, railSides } from "../services/types";
import { calculateSkirtPrice, calculateRailsPrice } from "@/utils/pricing";  // Updated import path
import LegalDisclaimer from "./sections/LegalDisclaimer";
import QuoteHeader from "./sections/QuoteHeader";
import StageSpecifications from "./sections/StageSpecifications";
import DailyCharges from "./sections/DailyCharges";
import OneTimeCharges from "./sections/OneTimeCharges";
import QuoteFooter from "./sections/QuoteFooter";

interface PrintQuoteProps {
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
  deliveryOption: "delivery" | "pickup" | null;
  deliveryZipCode: string | null;
  warehouseLocation: "nj" | "ny" | null;
}

const PrintQuote = ({ quoteData, deliveryOption, deliveryZipCode, warehouseLocation }: PrintQuoteProps) => {
  const currentDate = new Date();
  const quoteDate = format(currentDate, "MMMM d, yyyy");
  const expirationDate = format(addDays(currentDate, 3), "MMMM d, yyyy");
  const quoteRef = `QT-${Date.now().toString().slice(-6)}`;

  const getServiceLabel = (serviceId: string): { name: string; price: number } | null => {
    const allServices = [...getStairServices(quoteData.dimensions.height), ...baseServices];

    // Handle stairs with quantity
    if (serviceId.includes("-qty-")) {
      const [baseServiceId, quantity] = serviceId.split("-qty-");
      const service = allServices.find((s) => s.id === baseServiceId);
      if (!service) return null;
      
      return {
        name: `${service.name} (Qty: ${quantity})`,
        price: service.basePrice * parseInt(quantity)
      };
    }

    // Handle carpet
    if (serviceId === "carpet") {
      const colorService = quoteData.selectedServices.find(s => s.startsWith("carpet-"));
      if (!colorService) return null;

      const colorId = colorService.replace("carpet-", "");
      const color = carpetColors.find(c => c.id === colorId);
      if (!color) return null;

      const squareFootage = quoteData.dimensions.width * quoteData.dimensions.depth;
      return {
        name: `Carpet - ${color.name}, ${squareFootage} sq.ft`,
        price: color.price * squareFootage
      };
    }

    // Handle skirt with sides
    if (serviceId === "skirt") {
      const selectedSkirtSides = quoteData.selectedServices
        .filter(s => s.startsWith("skirt-side-"))
        .map(s => {
          const sideId = s.replace("skirt-side-", "");
          return skirtSides.find(side => side.id === sideId)?.name || sideId;
        });

      if (selectedSkirtSides.length === 0) return null;

      // Calculate total linear feet
      let totalLength = 0;
      selectedSkirtSides.forEach(side => {
        if (side.toLowerCase().includes('front') || side.toLowerCase().includes('rear')) {
          totalLength += quoteData.dimensions.width;
        } else if (side.toLowerCase().includes('left') || side.toLowerCase().includes('right')) {
          totalLength += quoteData.dimensions.depth;
        }
      });

      const totalPrice = calculateSkirtPrice(quoteData.selectedServices, quoteData.dimensions.width, quoteData.dimensions.depth);
      
      return {
        name: `Stage Skirt (${selectedSkirtSides.join(", ")}) - ${totalLength} linear ft`,
        price: totalPrice
      };
    }

    // Handle rails with sides
    if (serviceId === "rails") {
      const selectedRailSides = quoteData.selectedServices
        .filter(s => s.startsWith("rail-side-"))
        .map(s => {
          const sideId = s.replace("rail-side-", "");
          return railSides.find(side => side.id === sideId)?.name || sideId;
        });

      if (selectedRailSides.length === 0) return null;

      const totalPrice = calculateRailsPrice(quoteData.selectedServices, quoteData.dimensions.width, quoteData.dimensions.depth);

      return {
        name: `Safety Rails (${selectedRailSides.join(", ")})`,
        price: totalPrice
      };
    }

    // Handle standard services
    const service = allServices.find((s) => s.id === serviceId);
    if (!service) return null;

    return {
      name: service.name,
      price: service.basePrice
    };
  };

  // Calculate stage deck costs
  const sections4x8 = Math.floor(quoteData.dimensions.width / 8) * Math.floor(quoteData.dimensions.depth / 4);
  const sections4x4 = (quoteData.dimensions.width % 8 >= 4) ? Math.floor(quoteData.dimensions.depth / 4) : 0;

  return (
    <div className="print-only p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <QuoteHeader 
          quoteRef={quoteRef}
          quoteDate={quoteDate}
          expirationDate={expirationDate}
        />
        
        <LegalDisclaimer />

        <StageSpecifications 
          width={quoteData.dimensions.width}
          depth={quoteData.dimensions.depth}
          height={quoteData.dimensions.height}
          days={quoteData.dimensions.days}
        />

        <DailyCharges 
          sections4x8={sections4x8}
          sections4x4={sections4x4}
          selectedServices={quoteData.selectedServices}
          getServiceLabel={getServiceLabel}
          dailyCosts={quoteData.dailyCosts}
        />

        <OneTimeCharges 
          oneTimetCosts={quoteData.oneTimetCosts}
          hasCarpet={quoteData.hasCarpet}
          hasDelivery={quoteData.hasDelivery}
          width={quoteData.dimensions.width}
          depth={quoteData.dimensions.depth}
        />

        <div className="mt-8">
          <div className="flex justify-between items-center py-4 border-t border-b text-xl font-bold">
            <span>Total Estimate:</span>
            <span>${quoteData.totalCost.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            *Final price may vary based on event details and location
          </p>
        </div>

        <QuoteFooter />
      </div>
    </div>
  );
};

export default PrintQuote;
