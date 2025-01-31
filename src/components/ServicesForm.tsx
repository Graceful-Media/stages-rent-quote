import React, { useState } from "react";
import StairsService from "./services/StairsService";
import CarpetService from "./services/CarpetService";
import StandardService from "./services/StandardService";
import { Service, baseServices, carpetColors } from "./services/types";

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

  return [
    {
      id: "stairs-with-rails",
      name: "Stairs (w/Railings)",
      description: "Add stairs with safety railings to your stage setup",
      basePrice: 200,
    },
  ];
};

const ServicesForm = ({ selectedServices, onToggleService, height }: ServicesFormProps) => {
  const [selectedCarpetColor, setSelectedCarpetColor] = useState("black");
  const stairServices = getStairServices(height);
  const services = [...stairServices, ...baseServices];

  const handleCarpetColorChange = (colorId: string, price: number) => {
    setSelectedCarpetColor(colorId);
    console.log("Selected carpet color:", colorId, "Price:", price);
    
    const carpetService = services.find(s => s.id === "carpet");
    if (carpetService) {
      carpetService.basePrice = price;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Additional Services</h2>
      <div className="space-y-4">
        {stairServices.map((service) => (
          <StairsService
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={onToggleService}
          />
        ))}

        <CarpetService
          isSelected={selectedServices.includes("carpet")}
          onToggle={onToggleService}
          onColorChange={handleCarpetColorChange}
          selectedColor={selectedCarpetColor}
        />

        {baseServices.slice(1).map((service) => (
          <StandardService
            key={service.id}
            service={service}
            isSelected={selectedServices.includes(service.id)}
            onToggle={onToggleService}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesForm;
export { baseServices, getStairServices, carpetColors };