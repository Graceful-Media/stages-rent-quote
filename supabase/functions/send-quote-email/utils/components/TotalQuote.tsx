
import { Section, Heading, Text } from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';
import { highlightSection, subheader, price, disclaimer, callToAction, text } from '../styles.ts';

interface TotalQuoteProps {
  totalCost: number;
  dailyCosts: number;
  oneTimetCosts: number;
  hasDelivery?: boolean;
  hasSetup?: boolean;
  hasCarpet?: boolean;
  hasWarehouseFee?: boolean;
}

export const TotalQuote = ({ 
  totalCost,
  dailyCosts,
  oneTimetCosts,
  hasDelivery = false,
  hasSetup = false,
  hasCarpet = false,
  hasWarehouseFee = false,
}: TotalQuoteProps) => {
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
      
      <div style={{ marginBottom: '20px' }}>
        <Text style={text}>
          <strong>Daily Total:</strong> ${dailyCosts.toLocaleString()}/day
        </Text>
        <Text style={text}>
          <strong>One-time Charges:</strong> ${oneTimetCosts.toLocaleString()}
        </Text>
        {oneTimeChargesDescription && (
          <Text style={{ ...text, color: '#666', fontSize: '12px' }}>
            {oneTimeChargesDescription}
          </Text>
        )}
      </div>

      <Text style={price}>${totalCost.toFixed(2)}</Text>
      <Text style={disclaimer}>
        *Final price may vary based on event details and location
      </Text>
      <Text style={callToAction}>
        If you have any questions or would like to proceed with this quote, please reply to this email.
      </Text>
    </Section>
  );
};
