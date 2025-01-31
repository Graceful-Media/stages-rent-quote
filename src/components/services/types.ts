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
    basePrice: 200,
  },
  {
    id: "skirt",
    name: "Stage Skirt",
    description: "Professional stage skirting",
    basePrice: 100,
  },
  {
    id: "delivery",
    name: "Delivery & Setup",
    description: "Professional delivery and setup service",
    basePrice: 300,
  }
];