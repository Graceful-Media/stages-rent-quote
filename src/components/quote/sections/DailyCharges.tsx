
import React from "react";
import { Service } from "../../services/types";

interface ServiceDetails {
  name: string;
  price: number;
}

interface DailyChargesProps {
  sections4x8: number;
  sections4x4: number;
  selectedServices: string[];
  getServiceLabel: (serviceId: string) => ServiceDetails | null;
  dailyCosts: number;
}

const DailyCharges = ({ sections4x8, sections4x4, selectedServices, getServiceLabel, dailyCosts }: DailyChargesProps) => {
  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Daily Charges:</h3>
      <div className="space-y-2 pl-4">
        <div className="flex justify-between">
          <span>Stage Decks</span>
          <span>${(sections4x8 * 150) + (sections4x4 * 75)}/day</span>
        </div>
        {selectedServices.map((serviceId) => {
          if (serviceId.startsWith("carpet-") || 
              serviceId.startsWith("skirt-side-") || 
              serviceId.startsWith("rail-side-")) return null;

          const serviceDetails = getServiceLabel(serviceId);
          if (!serviceDetails) return null;

          return (
            <div key={serviceId} className="flex justify-between">
              <span>{serviceDetails.name}</span>
              <span>${serviceDetails.price}/day</span>
            </div>
          );
        })}
        <div className="flex justify-between font-medium pt-2 border-t">
          <span>Daily Total:</span>
          <span>${dailyCosts}/day</span>
        </div>
      </div>
    </div>
  );
};

export default DailyCharges;
