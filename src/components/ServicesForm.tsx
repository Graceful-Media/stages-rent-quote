import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

interface ServicesFormProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
  height: number;
}

const getStairServices = (height: number): Service[] => {
  if (height <= 8) {
    return [];
  }

  if (height <= 24) {
    return [
      {
        id: "stairs-no-rails",
        name: "Stairs (No Railings)",
        description: "Add stairs without safety railings to your stage setup",
        basePrice: 75,
      },
      {
        id: "stairs-with-rails",
        name: "Stairs (w/Railings)",
        description: "Add stairs with safety railings to your stage setup",
        basePrice: 150,
      },
    ];
  }

  if (height <= 40) {
    return [
      {
        id: "stairs-with-rails",
        name: "Stairs (w/Railings)",
        description: "Add stairs with safety railings to your stage setup",
        basePrice: 175,
      },
    ];
  }

  // For 48" height
  return [
    {
      id: "stairs-with-rails",
      name: "Stairs (w/Railings)",
      description: "Add stairs with safety railings to your stage setup",
      basePrice: 200,
    },
  ];
};

const carpetColors = [
  { id: "black", name: "Black", price: 5 },
  { id: "red", name: "Red", price: 6 },
  { id: "white", name: "White", price: 8 },
  { id: "pink", name: "Pink", price: 8 },
  { id: "other", name: "Other Color", price: 6 },
];

const baseServices: Service[] = [
  {
    id: "carpet",
    name: "Carpet",
    description: "Add carpet to your stage",
    basePrice: 5, // Default price (Black)
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

const ServicesForm = ({ selectedServices, onToggleService, height }: ServicesFormProps) => {
  const [selectedCarpetColor, setSelectedCarpetColor] = useState("black");
  const [customColor, setCustomColor] = useState("");
  const stairServices = getStairServices(height);
  const services = [...stairServices, ...baseServices];

  const handleCarpetColorChange = (colorId: string) => {
    setSelectedCarpetColor(colorId);
    console.log("Selected carpet color:", colorId);
    
    // Update the carpet service price based on the selected color
    const color = carpetColors.find(c => c.id === colorId);
    if (color) {
      const carpetService = services.find(s => s.id === "carpet");
      if (carpetService) {
        carpetService.basePrice = color.price;
      }
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Additional Services</h2>
      <div className="space-y-4">
        {stairServices.map((service) => (
          <div
            key={service.id}
            className="flex items-start space-x-4 p-4 rounded-lg border hover:border-quote-accent transition-colors"
          >
            <Checkbox
              id={service.id}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => onToggleService(service.id)}
            />
            <div className="space-y-1">
              <Label
                htmlFor={service.id}
                className="text-lg font-medium cursor-pointer"
              >
                {service.name}
              </Label>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}

        {/* Carpet Section */}
        <div className="flex flex-col space-y-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
          <div className="flex items-start space-x-4">
            <Checkbox
              id="carpet"
              checked={selectedServices.includes("carpet")}
              onCheckedChange={() => onToggleService("carpet")}
            />
            <div className="space-y-1">
              <Label
                htmlFor="carpet"
                className="text-lg font-medium cursor-pointer"
              >
                Carpet
              </Label>
              <p className="text-sm text-gray-600">Add carpet to your stage</p>
            </div>
          </div>

          {selectedServices.includes("carpet") && (
            <div className="ml-8 space-y-4">
              <RadioGroup
                value={selectedCarpetColor}
                onValueChange={handleCarpetColorChange}
                className="space-y-2"
              >
                {carpetColors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={color.id} id={`color-${color.id}`} />
                    <Label htmlFor={`color-${color.id}`}>
                      {color.name} (${color.price}/sq ft)
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {selectedCarpetColor === "other" && (
                <div className="space-y-2">
                  <Label htmlFor="custom-color">Specify Color:</Label>
                  <Input
                    id="custom-color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="Enter desired color"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Remaining Services */}
        {baseServices.slice(1).map((service) => (
          <div
            key={service.id}
            className="flex items-start space-x-4 p-4 rounded-lg border hover:border-quote-accent transition-colors"
          >
            <Checkbox
              id={service.id}
              checked={selectedServices.includes(service.id)}
              onCheckedChange={() => onToggleService(service.id)}
            />
            <div className="space-y-1">
              <Label
                htmlFor={service.id}
                className="text-lg font-medium cursor-pointer"
              >
                {service.name}
              </Label>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesForm;
export { baseServices, getStairServices, carpetColors };
