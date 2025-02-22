
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailQuoteDialog from "./EmailQuoteDialog";
import PrintQuote from "./PrintQuote";
import { createPortal } from "react-dom";
import { useState } from "react";

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
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePlaceOrder = () => {
    toast.success("Order Placed", {
      description: "Your order has been placed successfully.",
    });
  };

  const handlePrintQuote = () => {
    setIsPrinting(true);
    toast.success("Print Quote", {
      description: "Your quote is being prepared for printing.",
    });
    
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  const handleResetForm = () => {
    onResetForm();
    toast.success("Form Reset", {
      description: "All fields have been reset to their default values.",
    });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 no-print">
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
      {isPrinting && createPortal(
        <PrintQuote
          quoteData={quoteData}
          deliveryOption={deliveryOption}
          deliveryZipCode={deliveryZipCode}
          warehouseLocation={warehouseLocation}
        />,
        document.body
      )}
    </>
  );
};

export default FormActions;
