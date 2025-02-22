
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailQuoteDialog from "./EmailQuoteDialog";
import PrintQuote from "./PrintQuote";
import { createPortal } from "react-dom";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    <div className="space-y-6">
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

      <div className="space-y-4 text-sm text-gray-600 no-print">
        <p className="font-medium">
          If your event is less than 48hrs away, please call us for assistance - (646) 661-4078 - Mon - Fri 9am - 5pm EST.
        </p>
        <hr className="my-4" />
        <Alert>
          <AlertDescription>
            <p className="font-medium mb-2">Disclaimer:</p>
            The quote provided here does not reserve or hold any equipment or services. All orders are processed on a first-come, first-served basis upon receipt of completed paperwork and payment. We cannot guarantee the availability of equipment, crew, or delivery slots without a signed contract and a 50% non-refundable deposit at the time of confirmation. For events less than 30 days away, full payment is required.
          </AlertDescription>
        </Alert>
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
    </div>
  );
};

export default FormActions;
