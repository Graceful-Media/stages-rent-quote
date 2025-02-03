import React from "react";
import { format } from "date-fns";

interface DimensionsDisplayProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  startDate?: Date | null;
  endDate?: Date | null;
}

const DimensionsDisplay = ({ 
  width, 
  depth, 
  height, 
  days,
  startDate,
  endDate 
}: DimensionsDisplayProps) => {
  return (
    <div className="space-y-3">
      {startDate && endDate && (
        <>
          <div className="flex justify-between text-sm">
            <span className="italic">Rental Period Start:</span>
            <span className="italic">{format(startDate, 'MMM d, yyyy')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="italic">Rental Period End:</span>
            <span className="italic">{format(endDate, 'MMM d, yyyy')}</span>
          </div>
        </>
      )}
      <div className="flex justify-between text-sm">
        <span>Stage Size:</span>
        <span>{width}' × {depth}' × {height}"</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Rental Duration:</span>
        <span>{days} {days === 1 ? "day" : "days"}</span>
      </div>
    </div>
  );
};

export default DimensionsDisplay;