import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import DeliveryForm from "./DeliveryForm";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const QuoteCalculator = () => {
  const [stageDimensions, setStageDimensions] = useState({
    width: 0,
    depth: 0,
    height: 0,
    days: 1,
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup" | null>(null);
  const [continueToDelivery, setContinueToDelivery] = useState<"yes" | "no" | null>(null);
  const [continueToSetup, setContinueToSetup] = useState<"yes" | "no" | null>(null);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [warehouseLocation, setWarehouseLocation] = useState<"nj" | "ny" | null>(null);

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
    setStageDimensions({ width: 0, depth: 0, height: 0, days: 1 });
    setSelectedServices([]);
    setDeliveryOption(null);
    setContinueToDelivery(null);
    setContinueToSetup(null);
    setWarehouseLocation(null);
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

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Continue to Quote Delivery?</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>We service NYC, NJ, PA, CT areas</p>
              <p>Our warehousing is out of NJ & Brooklyn</p>
            </div>
            <RadioGroup 
              value={continueToDelivery || ""} 
              onValueChange={(value) => setContinueToDelivery(value as "yes" | "no")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="continue-yes" />
                <Label htmlFor="continue-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="continue-no" />
                <Label htmlFor="continue-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {continueToDelivery === "yes" && (
            <DeliveryForm
              isOpen={isDeliveryOpen}
              onOpenChange={setIsDeliveryOpen}
              deliveryOption={deliveryOption}
              onDeliveryOptionChange={(value) => {
                setDeliveryOption(value);
                // Reset warehouse location when delivery option changes
                if (value !== "pickup") {
                  setWarehouseLocation(null);
                }
              }}
              onWarehouseLocationChange={(location) => setWarehouseLocation(location)}
            />
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Continue to Quote Set Up?</h3>
            <RadioGroup 
              value={continueToSetup || ""} 
              onValueChange={(value) => setContinueToSetup(value as "yes" | "no")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="setup-yes" />
                <Label htmlFor="setup-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="setup-no" />
                <Label htmlFor="setup-no">No</Label>
              </div>
            </RadioGroup>
          </div>

          {continueToSetup === "yes" && (
            <Collapsible open={isSetupOpen} onOpenChange={setIsSetupOpen}>
              <div className="border rounded-lg p-4">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h2 className="text-2xl font-semibold text-quote-primary">Set Up Quote</h2>
                  <ChevronDown className={`h-6 w-6 transform transition-transform ${isSetupOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4">
                    <p>Set Up Quote options will be added here.</p>
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          )}
        </div>
        <div className="lg:col-span-1">
          <div className="space-y-6">
            <PriceSummary
              {...stageDimensions}
              selectedServices={selectedServices}
              warehouseLocation={warehouseLocation}
            />
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={handleResetForm} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
                Reset Form
              </Button>
              <Button onClick={handleEmailQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
                Email Me Quote
              </Button>
              <Button onClick={handlePrintQuote} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
                Print Quote
              </Button>
              <Button onClick={handlePlaceOrder} variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCalculator;
