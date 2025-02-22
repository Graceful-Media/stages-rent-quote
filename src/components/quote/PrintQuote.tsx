
import React from "react";
import { format } from "date-fns";
import StageLayoutDiagram from "../price-summary/StageLayoutDiagram";

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
  const quoteDate = format(new Date(), "MMMM d, yyyy");
  const quoteRef = `QT-${Date.now().toString().slice(-6)}`;

  return (
    <div className="print-only">
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-quote-primary mb-2">Stage Rental Quote</h1>
          <div className="text-sm text-gray-600">
            <p>Quote Reference: {quoteRef}</p>
            <p>Date: {quoteDate}</p>
          </div>
        </div>

        {/* Stage Specifications */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Stage Specifications</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p>Size: {quoteData.dimensions.width}' × {quoteData.dimensions.depth}' × {quoteData.dimensions.height}"</p>
              <p>Rental Duration: {quoteData.dimensions.days} {quoteData.dimensions.days === 1 ? "day" : "days"}</p>
            </div>
            <div>
              <StageLayoutDiagram
                width={quoteData.dimensions.width}
                depth={quoteData.dimensions.depth}
                sections4x8={Math.floor(quoteData.dimensions.width / 8) * Math.floor(quoteData.dimensions.depth / 4)}
                sections4x4={(quoteData.dimensions.width % 8 >= 4) ? Math.floor(quoteData.dimensions.depth / 4) : 0}
              />
            </div>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Pricing Breakdown</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Daily Charges: ${quoteData.dailyCosts.toLocaleString()}/day</h3>
              <div className="pl-4">
                {/* Daily charges details would be listed here */}
              </div>
            </div>
            
            {quoteData.oneTimetCosts > 0 && (
              <div>
                <h3 className="font-medium mb-2">One-time Charges: ${quoteData.oneTimetCosts.toLocaleString()}</h3>
                <div className="pl-4">
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
          <p className="mb-2">Terms & Conditions:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Quote valid for 30 days from the date issued</li>
            <li>50% deposit required to secure booking</li>
            <li>Final payment due 3 days before event date</li>
            <li>Cancellation fees may apply</li>
          </ul>
          <div className="mt-4">
            <p>Contact Information:</p>
            <p>Phone: (555) 123-4567</p>
            <p>Email: info@stagerental.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintQuote;
