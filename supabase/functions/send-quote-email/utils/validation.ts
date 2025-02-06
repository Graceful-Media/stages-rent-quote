export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export interface QuoteEmailRequest {
  recipientEmail: string;
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

export const validateQuoteRequest = (data: QuoteEmailRequest): void => {
  if (!isValidEmail(data.recipientEmail)) {
    throw new Error("Invalid email address");
  }

  if (!data.dimensions || !data.selectedServices || typeof data.totalCost !== 'number') {
    throw new Error("Missing required quote data");
  }
};