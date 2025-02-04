import React from "react";

interface SectionsDisplayProps {
  sections4x8: number;
  sections4x4: number;
  totalLegs: number;
}

const SectionsDisplay = ({ sections4x8, sections4x4, totalLegs }: SectionsDisplayProps) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>4'x8' Staging Decks:</span>
        <span>{sections4x8}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>4'x4' Staging Decks:</span>
        <span>{sections4x4}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Total Legs Required:</span>
        <span>{totalLegs}</span>
      </div>
    </div>
  );
};

export default SectionsDisplay;