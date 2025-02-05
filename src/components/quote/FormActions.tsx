import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
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
  };
}

const FormActions = ({ onResetForm, quoteData }: FormActionsProps) => {
  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully.",
    });
  };

  const handlePrintQuote = () => {
    toast({
      title: "Print Quote",
      description: "Your quote is being prepared for printing.",
    });
    window.print();
  };

  const handleResetForm = () => {
    onResetForm();
    toast({
      title: "Form Reset",
      description: "All fields have been reset to their default values.",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={handleResetForm} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Reset Form
      </Button>
      <EmailQuoteDialog quoteData={quoteData} />
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