
import React from "react";
import { format, addDays } from "date-fns";
import StageLayoutDiagram from "../price-summary/StageLayoutDiagram";
import { carpetColors, getStairServices, baseServices } from "../services/types";

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

      return {
        name: `Carpet - ${color.name}`,
        price: color.price * (quoteData.dimensions.width * quoteData.dimensions.depth)
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

  // Calculate sections for the layout diagram
  const sections4x8 = Math.floor(quoteData.dimensions.width / 8) * Math.floor(quoteData.dimensions.depth / 4);
  const sections4x4 = (quoteData.dimensions.width % 8 >= 4) ? Math.floor(quoteData.dimensions.depth / 4) : 0;

  return (
    <div className="print-only">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-quote-primary mb-2">Stage Rental Quote</h1>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Quote Reference: {quoteRef}</p>
            <p>Date: {quoteDate}</p>
            <p className="font-semibold">Quote Expires: {expirationDate}</p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="mb-4">
            <p className="font-bold mb-3">IMPORTANT DISCLAIMER:</p>
            <p className="mb-4">
              This quote DOES NOT reserve or hold any equipment or services. All orders are processed on a first-come, 
              first-served basis upon receipt of completed paperwork and payment. We cannot guarantee the availability 
              of equipment, crew, or delivery slots without a signed contract and a 50% non-refundable deposit at the 
              time of confirmation. For events less than 30 days away, full payment is required.
            </p>
            <p className="mb-4">
              Please review your quote carefully, including equipment, dates, and times, to ensure accuracy. 
              Immediate confirmation is recommended to secure your reservation.
            </p>
            <p className="mb-2">
              If your requirements are less than 48hrs away, please contact our offices:
            </p>
            <p className="font-medium">
              Phone: (646) 661-4078 (M-F 10am - 5pm EST)<br />
              Email: quotes@proavsource.com
            </p>
          </div>
        </div>

        {/* Stage Specifications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Stage Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p>Size: {quoteData.dimensions.width}' × {quoteData.dimensions.depth}' × {quoteData.dimensions.height}"</p>
              <p>Rental Duration: {quoteData.dimensions.days} {quoteData.dimensions.days === 1 ? "day" : "days"}</p>
              <p>4'x8' Staging Decks: {sections4x8}</p>
              <p>4'x4' Staging Decks: {sections4x4}</p>
            </div>
            <div>
              <StageLayoutDiagram
                width={quoteData.dimensions.width}
                depth={quoteData.dimensions.depth}
                sections4x8={sections4x8}
                sections4x4={sections4x4}
              />
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pricing Breakdown</h2>
          <div className="space-y-4">
            {/* Daily Charges */}
            <div>
              <h3 className="font-medium mb-2">Daily Charges: ${quoteData.dailyCosts.toLocaleString()}/day</h3>
              <div className="pl-4 space-y-1">
                {quoteData.selectedServices.map((serviceId) => {
                  if (serviceId.startsWith("carpet-")) return null;
                  const serviceDetails = getServiceLabel(serviceId);
                  if (!serviceDetails) return null;

                  return (
                    <div key={serviceId} className="flex justify-between">
                      <span>{serviceDetails.name}</span>
                      <span>${serviceDetails.price.toLocaleString()}/day</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* One-time Charges */}
            {quoteData.oneTimetCosts > 0 && (
              <div>
                <h3 className="font-medium mb-2">One-time Charges: ${quoteData.oneTimetCosts.toLocaleString()}</h3>
                <div className="pl-4 space-y-1">
                  {quoteData.hasDelivery && <p>• Delivery Service</p>}
                  {quoteData.hasSetup && <p>• Setup and Teardown</p>}
                  {quoteData.hasCarpet && <p>• Carpet Installation</p>}
                  {quoteData.hasWarehouseFee && <p>• BK Warehouse Prep Fee</p>}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Delivery Details */}
        {deliveryOption && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <p>Service Type: {deliveryOption === "delivery" ? "Delivery & Pickup" : "Customer Pickup"}</p>
            {deliveryZipCode && <p>Delivery Zip Code: {deliveryZipCode}</p>}
            {warehouseLocation && (
              <p>Pickup Location: {warehouseLocation.toUpperCase()} Warehouse</p>
            )}
          </div>
        )}

        {/* Total */}
        <div className="mb-8">
          <div className="text-2xl font-bold flex justify-between items-center py-4 border-t border-b">
            <span>Total Quote Amount:</span>
            <span>${quoteData.totalCost.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            *Final price may vary based on event details and location
          </p>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-600 mt-12">
          <p className="font-medium mb-2">Terms & Conditions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Quote valid for 3 days from the date listed</li>
            <li>50% deposit required to secure booking</li>
            <li>Final payment due 30 days before event date. If your event date is less than 30 days away, full payment is required at booking.</li>
            <li>Certificate of Insurance may be required, naming Pro AV Source, LLC as additional insured.</li>
            <li>Cancellation fees may apply</li>
          </ul>
          <div className="mt-4">
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
