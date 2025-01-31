import React from "react";

interface DimensionsDisplayProps {
  width: number;
  depth: number;
  height: number;
  days: number;
}

const DimensionsDisplay = ({ width, depth, height, days }: DimensionsDisplayProps) => {
  return (
    <div className="space-y-3">
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