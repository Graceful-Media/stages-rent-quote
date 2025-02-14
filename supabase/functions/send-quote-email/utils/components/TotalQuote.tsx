
import { Section, Heading, Text } from 'npm:@react-email/components@0.0.12';
import * as React from 'npm:react@18.3.1';
import { highlightSection, subheader, price, disclaimer, callToAction } from '../styles';

interface TotalQuoteProps {
  totalCost: number;
}

export const TotalQuote = ({ totalCost }: TotalQuoteProps) => (
  <Section style={highlightSection}>
    <Heading as="h2" style={subheader}>Total Quote</Heading>
    <Text style={price}>${totalCost.toFixed(2)}</Text>
    <Text style={disclaimer}>
      *Final price may vary based on event details and location
    </Text>
    <Text style={callToAction}>
      If you have any questions or would like to proceed with this quote, please reply to this email.
    </Text>
  </Section>
);
