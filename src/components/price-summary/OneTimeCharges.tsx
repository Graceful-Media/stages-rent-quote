import React from "react";
import { carpetColors } from "../services/types";

interface OneTimeChargesProps {
  selectedServices: string[];
  width: number;
  depth: number;
  warehouseLocation?: "nj" | "ny" | null;
  deliveryFee: number;
}

const OneTimeCharges = ({
  selectedServices,
  width,
  depth,
  warehouseLocation,
  deliveryFee
}: OneTimeChargesProps) => {
  const calculateCarpetPrice = () => {
    if (!selectedServices.includes("carpet")) return 0;
    
    const selectedColorId = selectedServices.find(service => 
      service.startsWith("carpet-")
    )?.replace("carpet-", "");
    
    const selectedColor = carpetColors.find(color => color.id === selectedColorId);
    const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
    
    return carpetPrice * (width * depth);
  };

  const carpetPrice = calculateCarpetPrice();
  const warehouseFee = warehouseLocation === "ny" ? 50 : 0;

  return (
    <div className="space-y-2 mt-4">
      <h4 className="font-medium">One-time Charges:</h4>
      {carpetPrice > 0 && (
        <div className="flex justify-between text-sm">
          <span>Carpet:</span>
          <span>${carpetPrice.toLocaleString()}</span>
        </div>
      )}
      {warehouseFee > 0 && (
        <div className="flex justify-between text-sm">
          <span>BK Warehouse Prep Fee:</span>
          <span>${warehouseFee.toLocaleString()}</span>
        </div>
      )}
      {deliveryFee > 0 && (
        <div className="flex justify-between text-sm">
          <span>Delivery (Round Trip):</span>
          <span>${deliveryFee.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default OneTimeCharges;