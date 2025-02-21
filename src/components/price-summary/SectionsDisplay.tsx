
import React from "react";
import StageLayoutDiagram from "./StageLayoutDiagram";

interface SectionsDisplayProps {
  sections4x8: number;
  sections4x4: number;
  totalLegs: number;
  width: number;
  depth: number;
}

const PRICE_4X8 = 150; // Price per 4'x8' deck
const PRICE_4X4 = 75;  // Price per 4'x4' deck

const SectionsDisplay = ({ sections4x8, sections4x4, totalLegs, width, depth }: SectionsDisplayProps) => {
  const total4x8 = sections4x8 * PRICE_4X8;
  const total4x4 = sections4x4 * PRICE_4X4;

  return (
    <div className="space-y-3">
      <div className="text-sm">
        <div className="flex justify-between items-baseline">
          <span>4'x8' Staging Decks:</span>
          <div className="text-right">
            <span>{sections4x8} @ ${PRICE_4X8}/deck = ${total4x8.toLocaleString()}/day</span>
          </div>
        </div>
      </div>
      <div className="text-sm">
        <div className="flex justify-between items-baseline">
          <span>4'x4' Staging Decks:</span>
          <div className="text-right">
            <span>{sections4x4} @ ${PRICE_4X4}/deck = ${total4x4.toLocaleString()}/day</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total Legs Required:</span>
        <span>{totalLegs}</span>
      </div>
      <StageLayoutDiagram 
        width={width}
        depth={depth}
        sections4x8={sections4x8}
        sections4x4={sections4x4}
      />
    </div>
  );
};

export default SectionsDisplay;
