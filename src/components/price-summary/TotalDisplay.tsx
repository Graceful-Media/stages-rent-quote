
import React from "react";

interface TotalDisplayProps {
  dailyCosts: number;
  oneTimetCosts: number;
  totalCost: number;
}

const TotalDisplay = ({ dailyCosts, oneTimetCosts, totalCost }: TotalDisplayProps) => {
  return (
    <div className="border-t pt-3">
      <div className="flex justify-between text-sm font-medium">
        <span>Daily Total:</span>
        <span>${dailyCosts.toLocaleString()}/day</span>
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div className="flex justify-between text-sm font-medium">
          <span>One-time Charges:</span>
          <span>${oneTimetCosts.toLocaleString()}</span>
        </div>
        <div className="text-xs text-gray-500 text-right">
          (Delivery, Set Up Cost, Carpet, BK Warehouse Prep Fee if applicable)
        </div>
      </div>
      <div className="flex justify-between font-semibold text-lg mt-4">
        <span>Total Estimate:</span>
        <span>${totalCost.toLocaleString()}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        *Final price may vary based on event details and location
      </p>
    </div>
  );
};

export default TotalDisplay;
