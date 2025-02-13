
import React from "react";

interface DimensionsDisplayProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  dateRange?: string | null;
  billingDays?: number;
}

const DimensionsDisplay = ({ 
  width, 
  depth, 
  height, 
  days, 
  dateRange,
  billingDays 
}: DimensionsDisplayProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Stage Size:</span>
        <span>{width}' × {depth}' × {height}"</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Rental Duration:</span>
        <div className="text-right">
          {dateRange ? (
            <>
              <div>{dateRange}</div>
              <div className="text-xs text-gray-500">
                ({billingDays} billing {billingDays === 1 ? 'day' : 'days'})
              </div>
            </>
          ) : (
            <span>{days} {days === 1 ? "day" : "days"}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DimensionsDisplay;
