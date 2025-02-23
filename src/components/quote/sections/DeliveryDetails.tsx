
import React from "react";
import { format } from "date-fns";

interface DeliveryDetailsProps {
  deliveryOption: "delivery" | "pickup" | null;
  deliveryDetails?: {
    deliveryDate: Date | null;
    deliveryTime: string | null;
    pickupDate: Date | null;
    pickupTime: string | null;
    venueName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    comments: string;
  };
  pickupDetails?: {
    warehouseLocation: "nj" | "ny" | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    comments: string;
  };
}

const DeliveryDetails = ({ deliveryOption, deliveryDetails, pickupDetails }: DeliveryDetailsProps) => {
  if (!deliveryOption) return null;

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Delivery / Pick Up Details:</h3>
      <div className="space-y-4 pl-4">
        <p className="font-medium">
          Option Selected: {deliveryOption === "delivery" ? "Delivery Service" : "Customer Pick Up"}
        </p>

        {deliveryOption === "delivery" && deliveryDetails && (
          <div className="space-y-3">
            <div>
              <p className="font-medium">Delivery Information:</p>
              <div className="pl-4 space-y-1">
                {deliveryDetails.deliveryDate && deliveryDetails.deliveryTime && (
                  <p>Delivery: {format(deliveryDetails.deliveryDate, "MMMM d, yyyy")} at {
                    new Date(`2000-01-01T${deliveryDetails.deliveryTime}`).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })
                  }</p>
                )}
                {deliveryDetails.pickupDate && deliveryDetails.pickupTime && (
                  <p>Pick Up: {format(deliveryDetails.pickupDate, "MMMM d, yyyy")} at {
                    new Date(`2000-01-01T${deliveryDetails.pickupTime}`).toLocaleTimeString([], {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })
                  }</p>
                )}
              </div>
            </div>

            <div>
              <p className="font-medium">Delivery Location:</p>
              <div className="pl-4 space-y-1">
                {deliveryDetails.venueName && <p>Venue: {deliveryDetails.venueName}</p>}
                <p>{deliveryDetails.addressLine1}</p>
                {deliveryDetails.addressLine2 && <p>{deliveryDetails.addressLine2}</p>}
                <p>{deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.zipCode}</p>
              </div>
            </div>

            {deliveryDetails.comments && (
              <div>
                <p className="font-medium">Additional Notes:</p>
                <p className="pl-4">{deliveryDetails.comments}</p>
              </div>
            )}
          </div>
        )}

        {deliveryOption === "pickup" && pickupDetails && (
          <div className="space-y-3">
            <div>
              <p className="font-medium">Warehouse Location:</p>
              <p className="pl-4">
                {pickupDetails.warehouseLocation === "nj" ? "NJ, North Bergen" : "NY, Brooklyn"}
              </p>
            </div>

            <div>
              <p className="font-medium">Pick Up Schedule:</p>
              <div className="pl-4 space-y-1">
                {pickupDetails.pickupDate && (
                  <p>Pick Up Date: {format(pickupDetails.pickupDate, "MMMM d, yyyy")}</p>
                )}
                {pickupDetails.returnDate && (
                  <p>Return Date: {format(pickupDetails.returnDate, "MMMM d, yyyy")}</p>
                )}
              </div>
            </div>

            {pickupDetails.comments && (
              <div>
                <p className="font-medium">Additional Notes:</p>
                <p className="pl-4">{pickupDetails.comments}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;
