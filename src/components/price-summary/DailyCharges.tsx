
import React from "react";
import { Service } from "../services/types";

interface ServiceDetails {
  name: string;
  price: number;
}

interface DailyChargesProps {
  sections4x8: number;
  sections4x4: number;
  sections2x8: number;
  sections8x2: number;
  sections2x6: number;
  sections6x2: number;
  sections2x4: number;
  sections4x2: number;
  sections2x2: number;
  selectedServices: string[];
  getServiceLabel: (serviceId: string) => ServiceDetails | null;
  dailyCosts: number;
}

const DailyCharges = ({ 
  sections4x8, 
  sections4x4,
  sections2x8,
  sections8x2,
  sections2x6,
  sections6x2,
  sections2x4,
  sections4x2,
  sections2x2,
  selectedServices, 
  getServiceLabel, 
  dailyCosts 
}: DailyChargesProps) => {
  // Helper function to get base service ID
  const getBaseServiceId = (serviceId: string): string => {
    if (serviceId.startsWith("stairs-")) {
      return serviceId.split("-qty-")[0];
    }
    if (serviceId.startsWith("skirt-side-")) return "skirt";
    if (serviceId.startsWith("rail-side-")) return "rails";
    if (serviceId.startsWith("carpet-")) return "carpet";
    return serviceId;
  };

  // Get unique base service IDs
  const uniqueServices = Array.from(new Set(
    selectedServices.map(getBaseServiceId)
  )).filter(id => id !== "carpet"); // Exclude carpet as it's a one-time charge

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Daily Charges:</h3>
      <div className="space-y-2 pl-4">
        <div className="space-y-1">
          {sections4x8 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (4'x8')</span>
              <span>${sections4x8 * 150}/day</span>
            </div>
          )}
          {sections4x4 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (4'x4')</span>
              <span>${sections4x4 * 75}/day</span>
            </div>
          )}
          {sections2x8 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (2'x8')</span>
              <span>${sections2x8 * 85}/day</span>
            </div>
          )}
          {sections2x6 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (2'x6')</span>
              <span>${sections2x6 * 85}/day</span>
            </div>
          )}
          {sections2x4 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (2'x4')</span>
              <span>${sections2x4 * 55}/day</span>
            </div>
          )}
          {sections4x2 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (4'x2')</span>
              <span>${sections4x2 * 55}/day</span>
            </div>
          )}
          {sections2x2 > 0 && (
            <div className="flex justify-between">
              <span>Stage Decks (2'x2')</span>
              <span>${sections2x2 * 50}/day</span>
            </div>
          )}
        </div>
        {uniqueServices.map((serviceId) => {
          const serviceDetails = getServiceLabel(serviceId);
          if (!serviceDetails || serviceDetails.price === 0) return null;

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
