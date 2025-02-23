
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';
import { QuoteDetails } from './components/QuoteDetails.tsx';

interface QuoteEmailProps {
  recipientName: string;
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  totalCost: number;
  dailyCosts: number;
  oneTimetCosts: number;
  hasDelivery: boolean;
  hasSetup: boolean;
  hasCarpet: boolean;
  hasWarehouseFee: boolean;
}

export const QuoteEmail = ({
  recipientName,
  dimensions,
  selectedServices,
  totalCost,
  dailyCosts,
  oneTimetCosts,
  hasDelivery,
  hasSetup,
  hasCarpet,
  hasWarehouseFee,
}: QuoteEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Section style={logoSection}>
          <Heading style={header}>Stage Rental Quote</Heading>
        </Section>

        <Section style={introSection}>
          <Text style={greeting}>Dear {recipientName},</Text>
          <Text style={introText}>
            Thank you for requesting a quote for your stage rental. Here are the details of your custom quote:
          </Text>
        </Section>

        <QuoteDetails
          dimensions={dimensions}
          selectedServices={selectedServices}
          totalCost={totalCost}
          dailyCosts={dailyCosts}
          oneTimetCosts={oneTimetCosts}
          hasDelivery={hasDelivery}
          hasSetup={hasSetup}
          hasCarpet={hasCarpet}
          hasWarehouseFee={hasWarehouseFee}
        />

        <Hr style={divider} />

        <Section style={footerSection}>
          <Text style={footerText}>
            This quote is valid for 3 days. To proceed with your rental, please contact our team or reply to this email.
          </Text>
          <Text style={footerText}>
            Contact us: (646) 661-4078 - Mon - Fri 9am - 5pm EST
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const logoSection = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const header = {
  color: '#333',
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  margin: '0',
};

const introSection = {
  padding: '20px 0',
};

const greeting = {
  fontSize: '16px',
  lineHeight: '1.4',
  margin: '0 0 10px 0',
};

const introText = {
  fontSize: '16px',
  lineHeight: '1.4',
  margin: '0 0 24px 0',
};

const divider = {
  borderTop: '1px solid #eaeaea',
  margin: '20px 0',
};

const footerSection = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '14px',
  color: '#666',
  lineHeight: '1.5',
  margin: '8px 0',
};

export default QuoteEmail;
