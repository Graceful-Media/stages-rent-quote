export const calculateSections = (width: number, depth: number) => {
  const area = width * depth;
  const sections4x8Count = Math.floor(area / 32);
  const remaining = area % 32;
  const sections4x4Count = Math.ceil(remaining / 16);
  
  return {
    sections4x8: sections4x8Count,
    sections4x4: sections4x4Count
  };
};

export const calculateTotalLegs = (width: number, depth: number) => {
  const sections = calculateSections(width, depth);
  return (sections.sections4x8 + sections.sections4x4) * 4;
};