import React from "react";
import { carpetColors } from "../services/types";

interface OneTimeChargesProps {
  selectedServices: string[];
  width: number;
  depth: number;
  warehouseLocation?: "nj" | "ny" | null;
}

const OneTimeCharges = ({ selectedServices, width, depth, warehouseLocation }: OneTimeChargesProps) => {
  const selectedColorId = selectedServices.find(service => 
    service.startsWith("carpet-")
  )?.replace("carpet-", "");
  
  const selectedCarpetColor = carpetColors.find(color => color.id === selectedColorId);

  return (
    <div>
      <div className="font-medium text-sm text-gray-600">One-time Charges:</div>
      {selectedServices.includes("carpet") && (
        <div className="flex justify-between text-sm">
          <span>
            Carpet - {selectedCarpetColor?.name || "Black"} ({width * depth} sq ft)
          </span>
          <span>
            ${((selectedCarpetColor?.price || carpetColors[0].price) * (width * depth)).toLocaleString()}
          </span>
        </div>
      )}
      {warehouseLocation === "ny" && (
        <div className="flex justify-between text-sm">
          <span>BK Warehouse Prep Fee</span>
          <span>$50</span>
        </div>
      )}
    </div>
  );
};

export default OneTimeCharges;