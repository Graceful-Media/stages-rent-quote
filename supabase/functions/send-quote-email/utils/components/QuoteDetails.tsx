
import {
  Section,
  Row,
  Column,
  Text,
} from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';

interface QuoteDetailsProps {
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

export const QuoteDetails = ({
  dimensions,
  selectedServices,
  totalCost,
  dailyCosts,
  oneTimetCosts,
  hasDelivery,
  hasSetup,
  hasCarpet,
  hasWarehouseFee,
}: QuoteDetailsProps) => {
  return (
    <Section style={section}>
      <Row>
        <Column>
          <Text style={heading}>Stage Specifications</Text>
          <Text style={detail}>Width: {dimensions.width} feet</Text>
          <Text style={detail}>Depth: {dimensions.depth} feet</Text>
          <Text style={detail}>Height: {dimensions.height} feet</Text>
          <Text style={detail}>Rental Duration: {dimensions.days} days</Text>
        </Column>
      </Row>

      <Row>
        <Column>
          <Text style={heading}>Selected Services</Text>
          {selectedServices.map((service, index) => (
            <Text key={index} style={detail}>{service}</Text>
          ))}
        </Column>
      </Row>

      <Row>
        <Column>
          <Text style={heading}>Cost Breakdown</Text>
          <Text style={detail}>Daily Costs: ${dailyCosts}</Text>
          <Text style={detail}>One-time Costs: ${oneTimetCosts}</Text>
          <Text style={detail}>Total Cost: ${totalCost}</Text>
        </Column>
      </Row>

      {(hasDelivery || hasSetup || hasCarpet || hasWarehouseFee) && (
        <Row>
          <Column>
            <Text style={heading}>Additional Services</Text>
            {hasDelivery && <Text style={detail}>✓ Delivery Service</Text>}
            {hasSetup && <Text style={detail}>✓ Setup Service</Text>}
            {hasCarpet && <Text style={detail}>✓ Carpet</Text>}
            {hasWarehouseFee && <Text style={detail}>✓ NY Warehouse Fee</Text>}
          </Column>
        </Row>
      )}
    </Section>
  );
};

const section = {
  padding: '20px 0',
  borderBottom: '1px solid #eee',
};

const heading = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const detail = {
  fontSize: '14px',
  color: '#666',
  margin: '5px 0',
};
