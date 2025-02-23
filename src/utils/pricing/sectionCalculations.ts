
import { SectionCounts } from "./types";

export const calculateSections = (width: number, depth: number): SectionCounts => {
  // Calculate width sections
  const numFull4ftAcross = Math.floor(width / 4);  // Full 4' sections
  const remaining2ftWidth = (width % 4) >= 2 ? 1 : 0;  // Remaining 2' section if needed
  
  // Calculate depth sections
  const fullRows8ft = Math.floor(depth / 8);       // Full 8' rows
  const remaining4ftDepth = Math.floor((depth % 8) / 4);  // 4' row if needed
  const remaining2ftDepth = ((depth % 8) % 4) >= 2 ? 1 : 0;  // 2' row if needed

  // Calculate sections based on the diagram logic
  const sections4x8 = numFull4ftAcross * fullRows8ft;
  const sections4x4 = numFull4ftAcross * remaining4ftDepth;
  const sections4x2 = numFull4ftAcross * remaining2ftDepth;
  
  const sections2x8 = remaining2ftWidth * fullRows8ft;
  const sections2x4 = remaining2ftWidth * remaining4ftDepth;
  const sections2x2 = remaining2ftWidth * remaining2ftDepth;

  // These sections are not used in the current layout
  const sections8x2 = 0;
  const sections6x2 = 0;
  const sections2x6 = 0;
  
  return {
    sections4x8,
    sections4x4,
    sections2x8,
    sections8x2,
    sections2x6,
    sections6x2,
    sections2x4,
    sections4x2,
    sections2x2
  };
};

export const calculateTotalLegs = (width: number, depth: number) => {
  const sections = calculateSections(width, depth);
  return (sections.sections4x8 + sections.sections4x4 + 
          sections.sections2x8 + sections.sections8x2 + 
          sections.sections2x6 + sections.sections6x2 + 
          sections.sections2x4 + sections.sections4x2 + 
          sections.sections2x2) * 4;
};
