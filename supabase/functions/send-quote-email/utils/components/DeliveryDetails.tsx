
import { Section, Heading, Text } from 'npm:@react-email/components@0.0.7';
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

  const isPickup = deliveryOption === 'pickup';
  const titleText = isPickup ? 'Warehouse Pick Up Details' : 'Delivery Details';
  const locationText = isPickup ? 'Pick Up Location' : 'Delivery Location';
  const firstDateText = isPickup ? 'Pick Up Date' : 'Delivery Date';
  const secondDateText = isPickup ? 'Return Date' : 'Pick Up Date';

  return deliveryOption ? (
    <Section style={section}>
      <Heading as="h2" style={subheader}>{titleText}</Heading>
      
      {isPickup ? (
        <>
          <Text style={text}>
            <strong>{locationText}:</strong> {warehouseLocation?.toUpperCase()} Warehouse
          </Text>
          <Text style={{...text, color: '#666', fontSize: '14px', marginTop: '-8px'}}>
            {warehouseLocation === 'ny' ? 
              'Brooklyn - $50 Warehouse Prep Fee - Mon-Fri 10am-5pm' : 
              'North Bergen - No Fees - Limited Hours - Mon-Fri 10am-5pm'}
          </Text>
        </>
      ) : (
        <>
          {venueName && (
            <Text style={text}>
              <strong>Venue:</strong> {venueName}
            </Text>
          )}
          <Text style={text}>
            <strong>{locationText}:</strong><br />
            {addressLine1}<br />
            {addressLine2 && <>{addressLine2}<br /></>}
            {city}, {state} {deliveryZipCode}
          </Text>
        </>
      )}

      <Text style={text}>
        <strong>{firstDateText}:</strong> {formatDate(deliveryDate)}
        {deliveryTime && ` at ${deliveryTime}`}
      </Text>
      <Text style={text}>
        <strong>{secondDateText}:</strong> {formatDate(pickupDate)}
        {pickupTime && ` at ${pickupTime}`}
      </Text>

      {isPickup && (
        <Text style={{...text, color: '#666', fontSize: '14px', marginTop: '12px'}}>
          *Certificate Of Insurance (COI) Required for warehouse pick up
        </Text>
      )}
    </Section>
  ) : null;
};
