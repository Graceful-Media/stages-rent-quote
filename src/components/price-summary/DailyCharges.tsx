
import React from "react";
import { Service } from "../services/types";

interface ServiceDetails {
  name: string;
  price: number;
}

interface DailyChargesProps {
  sections4x8: number;
  sections4x4: number;
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
  sections2x4,
  sections4x2,
  sections2x2,
  selectedServices, 
  getServiceLabel, 
  dailyCosts 
}: DailyChargesProps) => {
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
