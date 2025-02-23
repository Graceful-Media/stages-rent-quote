
import React from "react";
import StageLayoutDiagram from "./StageLayoutDiagram";

interface SectionsDisplayProps {
  sections4x8: number;
  sections4x4: number;
  sections2x8: number;
  sections8x2: number;
  sections2x6: number;
  sections6x2: number;
  sections2x4: number;
  sections4x2: number;
  sections2x2: number;
  totalLegs: number;
  width: number;
  depth: number;
}

const SectionsDisplay = ({ 
  sections4x8, 
  sections4x4,
  sections2x8,
  sections8x2,
  sections2x6,
  sections6x2,
  sections2x4,
  sections4x2,
  sections2x2,
  totalLegs, 
  width, 
  depth 
}: SectionsDisplayProps) => {
  return (
    <div className="space-y-3">
      {sections4x8 > 0 && (
        <div className="flex justify-between text-sm">
          <span>4'x8' Staging Decks:</span>
          <span>{sections4x8}</span>
        </div>
      )}
      {sections4x4 > 0 && (
        <div className="flex justify-between text-sm">
          <span>4'x4' Staging Decks:</span>
          <span>{sections4x4}</span>
        </div>
      )}
      {sections2x8 > 0 && (
        <div className="flex justify-between text-sm">
          <span>2'x8' Staging Decks:</span>
          <span>{sections2x8}</span>
        </div>
      )}
      {sections2x6 > 0 && (
        <div className="flex justify-between text-sm">
          <span>2'x6' Staging Decks:</span>
          <span>{sections2x6}</span>
        </div>
      )}
      {sections2x4 > 0 && (
        <div className="flex justify-between text-sm">
          <span>2'x4' Staging Decks:</span>
          <span>{sections2x4}</span>
        </div>
      )}
      {sections4x2 > 0 && (
        <div className="flex justify-between text-sm">
          <span>4'x2' Staging Decks:</span>
          <span>{sections4x2}</span>
        </div>
      )}
      {sections2x2 > 0 && (
        <div className="flex justify-between text-sm">
          <span>2'x2' Staging Decks:</span>
          <span>{sections2x2}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span>Total Legs Required:</span>
        <span>{totalLegs}</span>
      </div>
      <StageLayoutDiagram 
        width={width}
        depth={depth}
        sections4x8={sections4x8}
        sections4x4={sections4x4}
        sections2x8={sections2x8}
        sections8x2={sections8x2}
        sections2x6={sections2x6}
        sections6x2={sections6x2}
        sections2x4={sections2x4}
        sections4x2={sections4x2}
        sections2x2={sections2x2}
      />
    </div>
  );
};

export default SectionsDisplay;
