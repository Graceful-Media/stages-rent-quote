
import React from "react";
import { format, addDays } from "date-fns";
import { carpetColors, baseServices, getStairServices } from "../services/types";

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
              <span>${deckCost}/day</span>
            </div>
            {quoteData.selectedServices.map((serviceId) => {
              if (serviceId.startsWith("carpet-")) return null;
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
              <li>Final payment due 30 days before event date. If your event date is less than 30 days away, full payment is required at booking.</li>
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
