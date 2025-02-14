
import { renderAsync } from 'npm:@react-email/components@0.0.7';
import { QuoteEmail } from './QuoteEmail.tsx';

export const generateQuoteEmailHtml = async ({
  dimensions,
  selectedServices,
  totalCost,
  dailyCosts,
  oneTimetCosts,
  hasDelivery,
  hasSetup,
  hasCarpet,
  hasWarehouseFee,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
  stageLayoutImage,
  ...deliveryDetails
}: {
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
  hasDelivery?: boolean;
  hasSetup?: boolean;
  hasCarpet?: boolean;
  hasWarehouseFee?: boolean;
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
  deliveryDate?: Date | null;
  deliveryTime?: string | null;
  pickupDate?: Date | null;
  pickupTime?: string | null;
  stageLayoutImage?: string;
  venueName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
}) => {
  return await renderAsync(
    QuoteEmail({
      dimensions,
      selectedServices,
      totalCost,
      dailyCosts,
      oneTimetCosts,
      hasDelivery,
      hasSetup,
      hasCarpet,
      hasWarehouseFee,
      deliveryOption,
      deliveryZipCode,
      warehouseLocation,
      deliveryDate,
      deliveryTime,
      pickupDate,
      pickupTime,
      stageLayoutImage,
      ...deliveryDetails
    })
  );
};
