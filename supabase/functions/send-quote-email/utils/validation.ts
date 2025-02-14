
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

  // Ensure numeric values are valid numbers
  if (typeof data.totalCost !== "number" || isNaN(data.totalCost)) {
    throw new Error("Invalid total cost value");
  }

  if (typeof data.dailyCosts !== "number" || isNaN(data.dailyCosts)) {
    throw new Error("Invalid daily costs value");
  }

  if (typeof data.oneTimetCosts !== "number" || isNaN(data.oneTimetCosts)) {
    throw new Error("Invalid one-time costs value");
  }

  // Validate dimensions
  const { width, depth, height, days } = data.dimensions;
  if (!width || !depth || !height || !days) {
    throw new Error("All dimension values are required");
  }

  if (width <= 0 || depth <= 0 || height <= 0 || days <= 0) {
    throw new Error("Dimension values must be greater than 0");
  }
};
