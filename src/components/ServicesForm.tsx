import React, { useState } from "react";
import StairsService from "./services/StairsService";
import CarpetService from "./services/CarpetService";
import RailsService from "./services/RailsService";
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
  const [selectedRailSides, setSelectedRailSides] = useState<string[]>([]);
  const [stairsQuantities, setStairsQuantities] = useState<Record<string, number>>({});
  
  const stairServices = getStairServices(height);
  const services = [...stairServices, ...baseServices];

  const handleStairsQuantityChange = (serviceId: string, quantity: number) => {
    setStairsQuantities(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
    
    // Remove existing quantity from service ID
    const baseServiceId = serviceId.split('-qty-')[0];
    const existingService = selectedServices.find(s => s.startsWith(baseServiceId));
    if (existingService) {
      onToggleService(existingService);
    }
    
    // Add new service ID with quantity
    onToggleService(`${baseServiceId}-qty-${quantity}`);
  };

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
  };

  const handleSkirtSideToggle = (sideId: string) => {
    setSelectedSkirtSides(prev => {
      const newSides = prev.includes(sideId)
        ? prev.filter(id => id !== sideId)
        : [...prev, sideId];
      
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

  const handleRailSideToggle = (sideId: string) => {
    setSelectedRailSides(prev => {
      const newSides = prev.includes(sideId)
        ? prev.filter(id => id !== sideId)
        : [...prev, sideId];
      
      // Remove all rail side services first
      const existingSideServices = selectedServices.filter(service => 
        service.startsWith("rail-side-")
      );
      existingSideServices.forEach(service => onToggleService(service));
      
      // Add new rail side services
      newSides.forEach(side => onToggleService(`rail-side-${side}`));
      
      return newSides;
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-4">
        <SkirtService
          isSelected={selectedServices.includes("skirt")}
          onToggle={onToggleService}
          selectedSides={selectedSkirtSides}
          onSideToggle={handleSkirtSideToggle}
        />

        <CarpetService
          isSelected={selectedServices.includes("carpet")}
          onToggle={onToggleService}
          onColorChange={handleCarpetColorChange}
          selectedColor={selectedCarpetColor}
        />

        {stairServices.map((service) => {
          const serviceQuantity = selectedServices
            .find(s => s.startsWith(service.id))
            ?.split('-qty-')[1];
          const quantity = serviceQuantity ? parseInt(serviceQuantity) : 1;
          
          return (
            <StairsService
              key={service.id}
              service={service}
              isSelected={selectedServices.some(s => s.startsWith(service.id))}
              onToggle={onToggleService}
              quantity={quantity}
              onQuantityChange={(qty) => handleStairsQuantityChange(service.id, qty)}
            />
          );
        })}

        <RailsService
          isSelected={selectedServices.includes("rails")}
          onToggle={onToggleService}
          selectedSides={selectedRailSides}
          onSideToggle={handleRailSideToggle}
        />

        {baseServices
          .filter(service => service.id === "delivery")
          .map((service) => (
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