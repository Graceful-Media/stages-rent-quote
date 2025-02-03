import { toast } from "@/components/ui/use-toast";
import ActionButtons from "./ActionButtons";

interface FormActionsProps {
  onResetForm: () => void;
}

const FormActions = ({ onResetForm }: FormActionsProps) => {
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

  const handleEmailQuote = () => {
    toast({
      title: "Quote Emailed",
      description: "A copy of your quote has been sent to your email.",
    });
  };

  const handleResetForm = () => {
    onResetForm();
    toast({
      title: "Form Reset",
      description: "All fields have been reset to their default values.",
    });
  };

  return (
    <ActionButtons
      onResetForm={handleResetForm}
      onEmailQuote={handleEmailQuote}
      onPrintQuote={handlePrintQuote}
      onPlaceOrder={handlePlaceOrder}
    />
  );
};

export default FormActions;