
import React from "react";

interface OneTimeChargesProps {
  oneTimetCosts: number;
  hasCarpet: boolean;
  hasDelivery: boolean;
  width: number;
  depth: number;
}

const OneTimeCharges = ({ oneTimetCosts, hasCarpet, hasDelivery, width, depth }: OneTimeChargesProps) => {
  if (oneTimetCosts === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">One-time Charges:</h3>
      <div className="space-y-2 pl-4">
        {hasCarpet && (
          <div className="flex justify-between">
            <span>Carpet:</span>
            <span>${(width * depth * 5).toLocaleString()}</span>
          </div>
        )}
        {hasDelivery && (
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
  );
};

export default OneTimeCharges;
