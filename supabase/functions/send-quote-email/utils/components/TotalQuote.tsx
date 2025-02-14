
import { Section, Heading, Text } from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';
import { highlightSection, subheader, price, disclaimer, callToAction } from '../styles.ts';

interface TotalQuoteProps {
  totalCost: number;
  hasDelivery?: boolean;
  hasSetup?: boolean;
  hasCarpet?: boolean;
  hasWarehouseFee?: boolean;
}

export const TotalQuote = ({ 
  totalCost = 0,
  hasDelivery = false,
  hasSetup = false,
  hasCarpet = false,
  hasWarehouseFee = false,
}: TotalQuoteProps) => {
  const formattedTotalCost = Number(totalCost) || 0;

  const getOneTimeChargesDescription = () => {
    const charges = [];
    if (hasDelivery) charges.push("Delivery");
    if (hasSetup) charges.push("Set Up Cost");
    if (hasCarpet) charges.push("Carpet");
    if (hasWarehouseFee) charges.push("BK Warehouse Prep Fee");
    return charges.length > 0 ? `(${charges.join(", ")})` : null;
  };

  const oneTimeChargesDescription = getOneTimeChargesDescription();

  return (
    <Section style={highlightSection}>
      <Heading as="h2" style={subheader}>Total Quote</Heading>
      <Text style={price}>${formattedTotalCost.toLocaleString()}</Text>
      {oneTimeChargesDescription && (
        <Text style={{ color: '#666', fontSize: '12px', textAlign: 'center', margin: '8px 0' }}>
          {oneTimeChargesDescription}
        </Text>
      )}
      <Text style={disclaimer}>
        *Final price may vary based on event details and location
      </Text>
      <Text style={callToAction}>
        If you have any questions or would like to proceed with this quote, please reply to this email.
      </Text>
    </Section>
  );
};
