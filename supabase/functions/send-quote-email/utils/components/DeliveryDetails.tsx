
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
}

export const DeliveryDetails = ({
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
}: DeliveryDetailsProps) => (
  deliveryOption ? (
    <Section style={section}>
      <Heading as="h2" style={subheader}>Delivery Details</Heading>
      <Text style={text}>
        <strong>Delivery Option:</strong> {deliveryOption}
      </Text>
      {deliveryZipCode && (
        <Text style={text}>
          <strong>Delivery Zip Code:</strong> {deliveryZipCode}
        </Text>
      )}
      {warehouseLocation && (
        <Text style={text}>
          <strong>Warehouse Location:</strong> {warehouseLocation.toUpperCase()}
        </Text>
      )}
      <Text style={text}>
        <strong>Delivery Date:</strong> {deliveryDate ? new Date(deliveryDate).toLocaleDateString() : "Date TBC"}
        {deliveryTime && ` at ${deliveryTime}`}
      </Text>
      <Text style={text}>
        <strong>Pickup Date:</strong> {pickupDate ? new Date(pickupDate).toLocaleDateString() : "Date TBC"}
        {pickupTime && ` at ${pickupTime}`}
      </Text>
    </Section>
  ) : null
);
