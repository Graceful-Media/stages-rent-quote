import React from "react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

interface ActionButtonsProps {
  onResetForm: () => void;
  onEmailQuote: () => void;
  onPrintQuote: () => void;
  onPlaceOrder: () => void;
}

const ActionButtons = ({
  onResetForm,
  onEmailQuote,
  onPrintQuote,
  onPlaceOrder,
}: ActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button onClick={onResetForm} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Reset Form
      </Button>
      <Button onClick={onEmailQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Email Me Quote
      </Button>
      <Button onClick={onPrintQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Print Quote
      </Button>
      <Button onClick={onPlaceOrder} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
        Place Order
      </Button>
    </div>
  );
};

export default ActionButtons;