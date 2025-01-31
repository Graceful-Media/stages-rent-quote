import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import DeliveryForm from "./DeliveryForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

const QuoteCalculator = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup" | null>(null);

  const handleDimensionUpdate = (field: string, value: number) => {
    setStageDimensions((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleConfirmQuote = () => {
    toast({
      title: "Quote Confirmed",
      description: "Your quote has been confirmed. We'll be in touch shortly.",
    });
  };

  const handleQuoteDelivery = () => {
    toast({
      title: "Quote Delivery",
      description: "Please check your email for the delivery quote.",
    });
  };

  const handleResetForm = () => {
    setStageDimensions({ width: 0, depth: 0, height: 0 });
    setSelectedServices([]);
    setDeliveryOption(null);
    toast({
      title: "Form Reset",
      description: "All fields have been reset to their default values.",
    });
  };

  const handleEmailQuote = () => {
    toast({
      title: "Quote Emailed",
      description: "A copy of your quote has been sent to your email.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-quote-primary text-center mb-8">
        Get Your Stage Rental Quote
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PropertyForm
            {...stageDimensions}
            onUpdate={handleDimensionUpdate}
          />
          
          <Collapsible open={isServicesOpen} onOpenChange={setIsServicesOpen}>
            <div className="border rounded-lg p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-semibold text-quote-primary">Additional Services</h2>
                <ChevronDown className={`h-6 w-6 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ServicesForm
                  selectedServices={selectedServices}
                  onToggleService={handleToggleService}
                  height={stageDimensions.height}
                />
              </CollapsibleContent>
            </div>
          </Collapsible>

          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={handleConfirmQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
              Confirm Quote
            </Button>
            <Button onClick={handleQuoteDelivery} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
              Quote Delivery
            </Button>
            <Button onClick={handleResetForm} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
              Reset Form
            </Button>
            <Button onClick={handleEmailQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
              Email Me Quote
            </Button>
          </div>

          <DeliveryForm
            isOpen={isDeliveryOpen}
            onOpenChange={setIsDeliveryOpen}
            deliveryOption={deliveryOption}
            onDeliveryOptionChange={(value) => setDeliveryOption(value)}
          />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceSummary
              {...stageDimensions}
              selectedServices={selectedServices}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;