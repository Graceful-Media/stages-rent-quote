
import { Section, Heading, Text } from 'npm:@react-email/components@0.0.12';
import * as React from 'npm:react@18.3.1';
import { section, subheader, text } from '../styles.ts';

interface DeliveryDetailsProps {
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
  deliveryDate?: Date | null;
  deliveryTime?: string | null;
  pickupDate?: Date | null;
  pickupTime?: string | null;
  venueName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
}

export const DeliveryDetails = ({
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
  venueName,
  addressLine1,
  addressLine2,
  city,
  state,
}: DeliveryDetailsProps) => {
  const formatDate = (date: Date | null | undefined) => {
    if (!date) return "Date TBC";
    // Ensure we're working with a Date object
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return deliveryOption ? (
    <Section style={section}>
      <Heading as="h2" style={subheader}>Delivery Details</Heading>
      <Text style={text}>
        <strong>Delivery Option:</strong> {deliveryOption}
      </Text>
      {deliveryOption === "delivery" && (
        <>
          {venueName && (
            <Text style={text}>
              <strong>Venue:</strong> {venueName}
            </Text>
          )}
          <Text style={text}>
            <strong>Delivery Address:</strong><br />
            {addressLine1}<br />
            {addressLine2 && <>{addressLine2}<br /></>}
            {city}, {state} {deliveryZipCode}
          </Text>
        </>
      )}
      {warehouseLocation && (
        <Text style={text}>
          <strong>Warehouse Location:</strong> {warehouseLocation.toUpperCase()}
        </Text>
      )}
      <Text style={text}>
        <strong>Delivery Date:</strong> {formatDate(deliveryDate)}
        {deliveryTime && ` at ${deliveryTime}`}
      </Text>
      <Text style={text}>
        <strong>Pickup Date:</strong> {formatDate(pickupDate)}
        {pickupTime && ` at ${pickupTime}`}
      </Text>
    </Section>
  ) : null;
};
