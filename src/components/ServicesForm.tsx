import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
}

interface ServicesFormProps {
  selectedServices: string[];
  onToggleService: (serviceId: string) => void;
}

const services: Service[] = [
  {
    id: "staging",
    name: "Home Staging",
    description: "Professional staging with furniture and decor",
    basePrice: 1500,
  },
  {
    id: "declutter",
    name: "Decluttering",
    description: "Remove and organize excess items",
    basePrice: 500,
  },
  {
    id: "cleaning",
    name: "Deep Cleaning",
    description: "Thorough cleaning of entire property",
    basePrice: 300,
  },
];

const ServicesForm = ({ selectedServices, onToggleService }: ServicesFormProps) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold text-quote-primary">Select Services</h2>
      <div className="space-y-4">
        {services.map((service) => (
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
export { services };