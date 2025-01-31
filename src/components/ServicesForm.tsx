import React, { useState } from "react";
import StairsService from "./services/StairsService";
import CarpetService from "./services/CarpetService";
import StandardService from "./services/StandardService";
import SkirtService from "./services/SkirtService";
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
  const [selectedSkirtSides, setSelectedSkirtSides] = useState<string[]>([]);
  const stairServices = getStairServices(height);
  const services = [...stairServices, ...baseServices];

  const handleCarpetColorChange = (colorId: string) => {
    setSelectedCarpetColor(colorId);
    
    // First, remove any existing carpet color selections
    const existingColorServices = carpetColors.map(color => `carpet-${color.id}`);
    existingColorServices.forEach(colorService => {
      if (selectedServices.includes(colorService)) {
        onToggleService(colorService);
      }
    });
    
    // Add the new color selection
    onToggleService(`carpet-${colorId}`);
    
    console.log("Selected carpet color:", colorId);
  };

  const handleSkirtSideToggle = (sideId: string) => {
    setSelectedSkirtSides(prev => {
      const newSides = prev.includes(sideId)
        ? prev.filter(id => id !== sideId)
        : [...prev, sideId];
      
      console.log("Updated skirt sides:", newSides);
      
      // Remove all skirt side services first
      const existingSideServices = selectedServices.filter(service => 
        service.startsWith("skirt-side-")
      );
      existingSideServices.forEach(service => onToggleService(service));
      
      // Add new skirt side services
      newSides.forEach(side => onToggleService(`skirt-side-${side}`));
      
      return newSides;
    });
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

        <SkirtService
          isSelected={selectedServices.includes("skirt")}
          onToggle={onToggleService}
          selectedSides={selectedSkirtSides}
          onSideToggle={handleSkirtSideToggle}
        />

        {baseServices.slice(1).filter(service => service.id !== "skirt").map((service) => (
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