
import { renderAsync } from 'npm:@react-email/components@0.0.7';
import { QuoteEmail } from './QuoteEmail.tsx';

export const generateQuoteEmailHtml = async ({
  dimensions,
  selectedServices,
  totalCost,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
}: {
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
}) => {
  return await renderAsync(
    QuoteEmail({
      dimensions,
      selectedServices,
      totalCost,
      deliveryOption,
      deliveryZipCode,
      warehouseLocation,
    })
  );
};
