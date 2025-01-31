import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { railSides } from "./types";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface RailsServiceProps {
  isSelected: boolean;
  onToggle: (serviceId: string) => void;
  selectedSides: string[];
  onSideToggle: (sideId: string) => void;
}

const RailsService = ({
  isSelected,
  onToggle,
  selectedSides,
  onSideToggle,
}: RailsServiceProps) => {
  return (
    <div className="space-y-4 p-4 rounded-lg border hover:border-quote-accent transition-colors">
      <div className="flex items-start space-x-4">
        <Checkbox
          id="rails"
          checked={isSelected}
          onCheckedChange={() => onToggle("rails")}
        />
        <div className="space-y-1">
          <Label htmlFor="rails" className="text-lg font-medium cursor-pointer">
            Safety Rails
          </Label>
          <p className="text-sm text-gray-600">
            Add safety rails to secure your stage setup
          </p>
        </div>
      </div>

      {isSelected && (
        <div className="pl-8 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {railSides.map((side) => (
              <div key={side.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`rail-side-${side.id}`}
                  checked={selectedSides.includes(side.id)}
                  onCheckedChange={() => onSideToggle(side.id)}
                />
                <Label
                  htmlFor={`rail-side-${side.id}`}
                  className="cursor-pointer"
                >
                  {side.name}
                </Label>
              </div>
            ))}
          </div>
          
          {selectedSides.includes("front") && (
            <Alert variant="warning" className="bg-yellow-50">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Front rails are not typically recommended as they may obstruct stage access.
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default RailsService;