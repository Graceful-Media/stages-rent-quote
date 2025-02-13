
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Section,
  Text,
  Link,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface QuoteEmailProps {
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  totalCost: number;
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
}

export const QuoteEmail = ({
  dimensions,
  selectedServices,
  totalCost,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
}: QuoteEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={header}>Your Stage Rental Quote</Heading>
        
        <Section style={section}>
          <Heading as="h2" style={subheader}>Stage Specifications</Heading>
          <Text style={text}>
            <strong>Size:</strong> {dimensions.width}' × {dimensions.depth}' × {dimensions.height}"
          </Text>
          <Text style={text}>
            <strong>Rental Duration:</strong> {dimensions.days} {dimensions.days === 1 ? 'day' : 'days'}
          </Text>
        </Section>

        {selectedServices.length > 0 && (
          <Section style={section}>
            <Heading as="h2" style={subheader}>Selected Services</Heading>
            <ul style={list}>
              {selectedServices.map((service, index) => (
                <li key={index} style={listItem}>{service}</li>
              ))}
            </ul>
          </Section>
        )}

        {deliveryOption && (
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
          </Section>
        )}

        <Section style={highlightSection}>
          <Heading as="h2" style={subheader}>Total Quote</Heading>
          <Text style={price}>${totalCost.toFixed(2)}</Text>
          <Text style={disclaimer}>
            *Final price may vary based on event details and location
          </Text>
        </Section>

        <Hr style={divider} />

        <Section style={footer}>
          <Text style={footerText}>
            Thank you for choosing our stage rental services. If you have any questions or would like to proceed with this quote, please contact us.
          </Text>
          <Text style={footerText}>
            <strong>Phone:</strong> (646) 661-4078
          </Text>
          <Text style={footerText}>
            <strong>Email:</strong>{' '}
            <Link href="mailto:quotes@proavsource.com" style={link}>
              quotes@proavsource.com
            </Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
};

const section = {
  backgroundColor: '#f5f5f5',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const highlightSection = {
  backgroundColor: '#e8f4ff',
  padding: '20px',
  borderRadius: '8px',
  margin: '20px 0',
};

const subheader = {
  color: '#444',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px',
};

const text = {
  color: '#333',
  fontSize: '14px',
  margin: '8px 0',
};

const list = {
  listStyleType: 'none',
  padding: 0,
  margin: '10px 0',
};

const listItem = {
  margin: '5px 0',
  fontSize: '14px',
  color: '#333',
};

const price = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center' as const,
  margin: '20px 0 10px',
};

const disclaimer = {
  fontSize: '12px',
  color: '#666',
  textAlign: 'center' as const,
  margin: '10px 0',
};

const divider = {
  margin: '30px 0',
  borderTop: '1px solid #eaeaea',
};

const footer = {
  textAlign: 'center' as const,
  margin: '30px 0 0',
};

const footerText = {
  color: '#666',
  fontSize: '14px',
  margin: '8px 0',
};

const link = {
  color: '#0066cc',
  textDecoration: 'none',
};

export default QuoteEmail;
