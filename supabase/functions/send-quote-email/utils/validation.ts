
interface QuoteRequest {
  recipientEmail: string;
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
  hasDelivery?: boolean;
  hasSetup?: boolean;
  hasCarpet?: boolean;
  hasWarehouseFee?: boolean;
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
}

export const validateQuoteRequest = (data: QuoteRequest) => {
  if (!data.recipientEmail) {
    throw new Error("Recipient email is required");
  }

  if (!data.recipientName) {
    throw new Error("Recipient name is required");
  }

  if (!data.dimensions || typeof data.dimensions !== "object") {
    throw new Error("Invalid dimensions object");
  }

  if (!Array.isArray(data.selectedServices)) {
    throw new Error("Selected services must be an array");
  }

  // Convert and validate numeric values
  data.totalCost = Number(data.totalCost) || 0;
  data.dailyCosts = Number(data.dailyCosts) || 0;
  data.oneTimetCosts = Number(data.oneTimetCosts) || 0;

  // Ensure dimensions are numbers and valid
  const { width, depth, height, days } = data.dimensions;
  if (!Number(width) || !Number(depth) || !Number(height) || !Number(days)) {
    throw new Error("All dimension values are required and must be numbers");
  }

  if (width <= 0 || depth <= 0 || height <= 0 || days <= 0) {
    throw new Error("Dimension values must be greater than 0");
  }

  // Convert dimensions to numbers
  data.dimensions = {
    width: Number(width),
    depth: Number(depth),
    height: Number(height),
    days: Number(days),
  };

  return data;
};
