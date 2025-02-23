
import React from "react";
import { format, addDays } from "date-fns";
import { carpetColors, baseServices, getStairServices, skirtSides, railSides } from "../services/types";
import { calculateSkirtPrice, calculateRailsPrice } from "@/utils/priceCalculations";

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
  const deckCost = (sections4x8 * 150) + (sections4x4 * 75); // $150 for 4x8, $75 for 4x4

  return (
    <div className="print-only p-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        {/* Legal Disclaimer */}
        <div className="mb-8 text-sm space-y-4">
          <p className="font-bold">
            This quote DOES NOT reserve or hold any equipment or services. All orders are processed on a first-come, first-served basis upon receipt of completed paperwork and payment. We cannot guarantee the availability of equipment, crew, or delivery slots without a signed contract and a 50% non-refundable deposit at the time of confirmation. For events less than 30 days away, full payment is required.
          </p>
          <p>
            Please review your quote carefully, including equipment, dates, and times, to ensure accuracy. Immediate confirmation is recommended to secure your reservation.
          </p>
          <p>
            If your requirements are less than 48hrs away, please contact our offices @ (646) 661-4078 M-F 10am - 5pm EST. Or email us - quotes@proavsource.com
          </p>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Stage Rental Quote</h1>
          <div className="text-sm space-y-1">
            <p>Quote Reference: {quoteRef}</p>
            <p>Date: {quoteDate}</p>
            <p className="font-semibold">Quote Expires: {expirationDate}</p>
          </div>
        </div>

        {/* Stage Specifications */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Stage Specifications</h2>
          <div className="space-y-2">
            <p>Size: {quoteData.dimensions.width}' × {quoteData.dimensions.depth}' × {quoteData.dimensions.height}"</p>
            <p>Rental Duration: {quoteData.dimensions.days} {quoteData.dimensions.days === 1 ? "day" : "days"}</p>
          </div>
        </div>

        {/* Daily Charges */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Daily Charges:</h3>
          <div className="space-y-2 pl-4">
            <div className="flex justify-between">
              <span>Stage Decks</span>
              <span>${(sections4x8 * 150) + (sections4x4 * 75)}/day</span>
            </div>
            {quoteData.selectedServices.map((serviceId) => {
              if (serviceId.startsWith("carpet-") || 
                  serviceId.startsWith("skirt-side-") || 
                  serviceId.startsWith("rail-side-")) return null;

              const serviceDetails = getServiceLabel(serviceId);
              if (!serviceDetails) return null;

              return (
                <div key={serviceId} className="flex justify-between">
                  <span>{serviceDetails.name}</span>
                  <span>${serviceDetails.price}/day</span>
                </div>
              );
            })}
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Daily Total:</span>
              <span>${quoteData.dailyCosts}/day</span>
            </div>
          </div>
        </div>

        {/* One-time Charges */}
        {quoteData.oneTimetCosts > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-3">One-time Charges:</h3>
            <div className="space-y-2 pl-4">
              {quoteData.hasCarpet && (
                <div className="flex justify-between">
                  <span>Carpet:</span>
                  <span>${(quoteData.dimensions.width * quoteData.dimensions.depth * 5).toLocaleString()}</span>
                </div>
              )}
              {quoteData.hasDelivery && (
                <div className="flex justify-between">
                  <span>Delivery (Round Trip):</span>
                  <span>$650</span>
                </div>
              )}
              <div className="text-sm text-gray-500 pt-1">
                (Delivery, Carpet)
              </div>
            </div>
          </div>
        )}

        {/* Total */}
        <div className="mt-8">
          <div className="flex justify-between items-center py-4 border-t border-b text-xl font-bold">
            <span>Total Estimate:</span>
            <span>${quoteData.totalCost.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            *Final price may vary based on event details and location
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm space-y-6">
          <div>
            <p className="font-medium mb-2">Terms & Conditions:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Quote valid for 3 days from the date listed</li>
              <li>50% deposit required to secure booking</li>
              <li>Final payment due 30 days before event date. If your event date is less than 30 days away, full payment is required.</li>
              <li>Certificate of Insurance may be required, naming Pro AV Source, LLC as additional insured.</li>
              <li>Cancellation fees may apply</li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Contact Information:</p>
            <p>Pro AV Source</p>
            <p>www.Stages.rent</p>
            <p>(646) 733-8576 - Mon - Sat - 10am - 5pm EST</p>
            <p>quotes@proavsource.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQuote;
