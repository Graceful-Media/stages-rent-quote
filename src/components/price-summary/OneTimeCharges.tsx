import React from "react";
import { carpetColors } from "../ServicesForm";

interface OneTimeChargesProps {
  selectedServices: string[];
  width: number;
  depth: number;
}

const OneTimeCharges = ({ selectedServices, width, depth }: OneTimeChargesProps) => {
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
    </div>
  );
};

export default OneTimeCharges;