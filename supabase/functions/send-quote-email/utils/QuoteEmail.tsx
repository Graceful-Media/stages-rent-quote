
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Hr,
} from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';
import { Header } from './components/Header.tsx';
import { StageSpecifications } from './components/StageSpecifications.tsx';
import { SelectedServices } from './components/SelectedServices.tsx';
import { DeliveryDetails } from './components/DeliveryDetails.tsx';
import { TotalQuote } from './components/TotalQuote.tsx';
import { Footer } from './components/Footer.tsx';
import { main, container, header, divider } from './styles.ts';

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
  deliveryDate?: Date | null;
  deliveryTime?: string | null;
  pickupDate?: Date | null;
  pickupTime?: string | null;
  stageLayoutImage?: string;
}

export const QuoteEmail = ({
  dimensions,
  selectedServices,
  totalCost,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
  stageLayoutImage,
}: QuoteEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Header />
        <Heading style={header}>Your Stage Rental Quote</Heading>
        <StageSpecifications dimensions={dimensions} stageLayoutImage={stageLayoutImage} />
        <SelectedServices services={selectedServices} />
        <DeliveryDetails
          deliveryOption={deliveryOption}
          deliveryZipCode={deliveryZipCode}
          warehouseLocation={warehouseLocation}
          deliveryDate={deliveryDate}
          deliveryTime={deliveryTime}
          pickupDate={pickupDate}
          pickupTime={pickupTime}
        />
        <TotalQuote totalCost={totalCost} />
        <Hr style={divider} />
        <Footer />
      </Container>
    </Body>
  </Html>
);

export default QuoteEmail;
