
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailQuoteDialog from "./EmailQuoteDialog";

interface FormActionsProps {
  onResetForm: () => void;
  quoteData: {
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
  };
  deliveryOption: "delivery" | "pickup" | null;
  deliveryZipCode: string | null;
  warehouseLocation: "nj" | "ny" | null;
}

const FormActions = ({ 
  onResetForm, 
  quoteData,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
}: FormActionsProps) => {
  const handlePlaceOrder = () => {
    toast.success("Order Placed", {
      description: "Your order has been placed successfully.",
    });
  };

  const handlePrintQuote = () => {
    toast.success("Print Quote", {
      description: "Your quote is being prepared for printing.",
    });
    window.print();
  };

  const handleResetForm = () => {
    onResetForm();
    toast.success("Form Reset", {
      description: "All fields have been reset to their default values.",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={handleResetForm} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Reset Form
      </Button>
      <EmailQuoteDialog 
        quoteData={quoteData}
        deliveryOption={deliveryOption}
        deliveryZipCode={deliveryZipCode}
        warehouseLocation={warehouseLocation}
      />
      <Button onClick={handlePrintQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Print Quote
      </Button>
      <Button onClick={handlePlaceOrder} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Place Order
      </Button>
    </div>
  );
};

export default FormActions;
