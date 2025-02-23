
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

  const formatTime = (timeString: string | null) => {
    if (!timeString) return null;
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-lg mb-4">Delivery / Pick Up Details:</h3>
      <div className="space-y-4">
        <p>
          <span className="font-medium">Option Selected:</span> {deliveryOption === "delivery" ? "Delivery Service" : "Customer Pick Up"}
        </p>

        {deliveryOption === "delivery" && deliveryDetails && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Delivery Schedule:</p>
              {deliveryDetails.deliveryDate && (
                <p className="ml-4">
                  Delivery: {format(deliveryDetails.deliveryDate, "MMMM d, yyyy")}
                  {deliveryDetails.deliveryTime && ` at ${formatTime(deliveryDetails.deliveryTime)}`}
                </p>
              )}
              {deliveryDetails.pickupDate && (
                <p className="ml-4">
                  Pick Up: {format(deliveryDetails.pickupDate, "MMMM d, yyyy")}
                  {deliveryDetails.pickupTime && ` at ${formatTime(deliveryDetails.pickupTime)}`}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <p className="font-medium">Delivery Location:</p>
              <div className="ml-4">
                {deliveryDetails.venueName && <p>{deliveryDetails.venueName}</p>}
                <p>{deliveryDetails.addressLine1}</p>
                {deliveryDetails.addressLine2 && <p>{deliveryDetails.addressLine2}</p>}
                <p>{deliveryDetails.city}, {deliveryDetails.state} {deliveryDetails.zipCode}</p>
              </div>
            </div>

            {deliveryDetails.comments && (
              <div className="space-y-2">
                <p className="font-medium">Additional Notes:</p>
                <p className="ml-4">{deliveryDetails.comments}</p>
              </div>
            )}
          </div>
        )}

        {deliveryOption === "pickup" && pickupDetails && (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium">Warehouse Location:</p>
              <p className="ml-4">
                {pickupDetails.warehouseLocation === "nj" ? "NJ, North Bergen" : "NY, Brooklyn"}
                <br />
                <span className="text-sm text-gray-600">
                  {pickupDetails.warehouseLocation === "nj" 
                    ? "No Fees - Limited Hours - Mon-Fri 10am-5pm"
                    : "$50 Warehouse Prep Fee - Mon-Fri 10am-5pm"}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Pick Up Schedule:</p>
              <div className="ml-4">
                {pickupDetails.pickupDate && (
                  <p>Pick Up: {format(pickupDetails.pickupDate, "MMMM d, yyyy")}</p>
                )}
                {pickupDetails.returnDate && (
                  <p>Return: {format(pickupDetails.returnDate, "MMMM d, yyyy")}</p>
                )}
              </div>
            </div>

            {pickupDetails.comments && (
              <div className="space-y-2">
                <p className="font-medium">Additional Notes:</p>
                <p className="ml-4">{pickupDetails.comments}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryDetails;
