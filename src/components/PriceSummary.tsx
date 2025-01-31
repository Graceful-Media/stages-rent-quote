import React from "react";
import DimensionsDisplay from "./price-summary/DimensionsDisplay";
import SectionsDisplay from "./price-summary/SectionsDisplay";
import DailyCharges from "./price-summary/DailyCharges";
import OneTimeCharges from "./price-summary/OneTimeCharges";
import TotalDisplay from "./price-summary/TotalDisplay";
import { carpetColors } from "./services/types";

interface PriceSummaryProps {
  width: number;
  depth: number;
  height: number;
  days: number;
  selectedServices: string[];
}

const PriceSummary = ({
  width,
  depth,
  height,
  days,
  selectedServices,
}: PriceSummaryProps) => {
  const calculateSections = () => {
    const area = width * depth;
    const sections4x8Count = Math.floor(area / 32);
    const remaining = area % 32;
    const sections4x4Count = Math.ceil(remaining / 16);
    
    return {
      sections4x8: sections4x8Count,
      sections4x4: sections4x4Count
    };
  };

  const calculateRailsPrice = () => {
    const selectedSides = selectedServices
      .filter(service => service.startsWith("rail-side-"))
      .map(service => service.replace("rail-side-", ""));

    let totalLength = 0;
    selectedSides.forEach(side => {
      if (side === "front" || side === "rear") {
        totalLength += width;
      } else if (side === "left" || side === "right") {
        totalLength += depth;
      }
    });

    const numOf8ftSections = Math.floor(totalLength / 8);
    const remaining = totalLength % 8;
    const numOf4ftSections = Math.ceil(remaining / 4);
    const totalPrice = (numOf8ftSections * 60) + (numOf4ftSections * 50);

    return totalPrice;
  };

  const calculateSkirtPrice = () => {
    const selectedSides = selectedServices
      .filter(service => service.startsWith("skirt-side-"))
      .map(service => service.replace("skirt-side-", ""));

    let totalLength = 0;
    selectedSides.forEach(side => {
      if (side === "front" || side === "rear") {
        totalLength += width;
      } else if (side === "left" || side === "right") {
        totalLength += depth;
      }
    });

    return totalLength * 3; // $3 per linear foot
  };

  const calculateTotal = () => {
    const sections = calculateSections();
    const section4x4Price = 75;
    const section4x8Price = 150;
    
    const sectionsCost = (sections.sections4x8 * section4x8Price) + 
                        (sections.sections4x4 * section4x4Price);
    
    let dailyCosts = 0;
    let oneTimetCosts = 0;

    // Handle carpet separately (one-time cost)
    if (selectedServices.includes("carpet")) {
      const selectedColorId = selectedServices.find(service => 
        service.startsWith("carpet-")
      )?.replace("carpet-", "");
      
      const selectedColor = carpetColors.find(color => color.id === selectedColorId);
      const carpetPrice = selectedColor ? selectedColor.price : carpetColors[0].price;
      
      oneTimetCosts += carpetPrice * (width * depth);
    }

    // Add daily costs
    dailyCosts += sectionsCost;

    // Handle skirt separately (daily cost)
    if (selectedServices.includes("skirt")) {
      dailyCosts += calculateSkirtPrice();
    }

    // Handle rails separately (daily cost)
    if (selectedServices.includes("rails")) {
      dailyCosts += calculateRailsPrice();
    }

    // Calculate final total
    const totalCost = (dailyCosts * days) + oneTimetCosts;

    return {
      dailyCosts,
      oneTimetCosts,
      totalCost
    };
  };

  const calculateTotalLegs = () => {
    const sections = calculateSections();
    return (sections.sections4x8 + sections.sections4x4) * 4;
  };

  const sections = calculateSections();
  const totalLegs = calculateTotalLegs();
  const totals = calculateTotal();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 animate-fadeIn">
      <h3 className="text-xl font-semibold text-quote-primary mb-4">Price Summary</h3>
      <div className="space-y-3">
        <DimensionsDisplay 
          width={width} 
          depth={depth} 
          height={height} 
          days={days}
        />
        
        <SectionsDisplay 
          sections4x8={sections.sections4x8}
          sections4x4={sections.sections4x4}
          totalLegs={totalLegs}
        />

        <div className="border-t pt-3">
          <DailyCharges 
            selectedServices={selectedServices}
            height={height}
            width={width}
            depth={depth}
            calculateSkirtPrice={calculateSkirtPrice}
            calculateRailsPrice={calculateRailsPrice}
          />
          
          <OneTimeCharges 
            selectedServices={selectedServices}
            width={width}
            depth={depth}
          />
        </div>

        <TotalDisplay 
          dailyCosts={totals.dailyCosts}
          oneTimetCosts={totals.oneTimetCosts}
          totalCost={totals.totalCost}
        />
      </div>
    </div>
  );
};

export default PriceSummary;