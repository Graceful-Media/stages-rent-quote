
import React from "react";

interface StageSpecificationsProps {
  width: number;
  depth: number;
  height: number;
  days: number;
}

const StageSpecifications = ({ width, depth, height, days }: StageSpecificationsProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Stage Specifications</h2>
      <div className="space-y-2">
        <p>Size: {width}' × {depth}' × {height}"</p>
        <p>Rental Duration: {days} {days === 1 ? "day" : "days"}</p>
      </div>
    </div>
  );
};

export default StageSpecifications;
