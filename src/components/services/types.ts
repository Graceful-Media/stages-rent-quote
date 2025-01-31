export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

export interface CarpetColor {
  id: string;
  name: string;
  price: number;
}

export interface SkirtSide {
  id: string;
  name: string;
}

export interface RailSide {
  id: string;
  name: string;
  isUncommon?: boolean;
}

export const railSides: RailSide[] = [
  { id: "front", name: "Front", isUncommon: true },
  { id: "left", name: "Left Side" },
  { id: "right", name: "Right Side" },
  { id: "rear", name: "Rear" },
];

export const skirtSides: SkirtSide[] = [
  { id: "front", name: "Front" },
  { id: "left", name: "Left Side" },
  { id: "right", name: "Right Side" },
  { id: "rear", name: "Rear" },
];

export const carpetColors: CarpetColor[] = [
  { id: "black", name: "Black", price: 5 },
  { id: "red", name: "Red", price: 6 },
  { id: "white", name: "White", price: 8 },
  { id: "pink", name: "Pink", price: 8 },
  { id: "other", name: "Other Color", price: 6 },
];

export const baseServices: Service[] = [
  {
    id: "carpet",
    name: "Carpet",
    description: "Add carpet to your stage",
    basePrice: 5,
  },
  {
    id: "rails",
    name: "Safety Rails",
    description: "Add safety rails to your stage",
    basePrice: 0, // Base price is calculated dynamically
  },
  {
    id: "skirt",
    name: "Stage Skirt",
    description: "Professional stage skirting",
    basePrice: 3, // Price per linear foot
  },
  {
    id: "delivery",
    name: "Delivery & Setup",
    description: "Professional delivery and setup service",
    basePrice: 300,
  }
];