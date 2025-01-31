import React, { useState } from "react";
import PropertyForm from "./PropertyForm";
import ServicesForm from "./ServicesForm";
import PriceSummary from "./PriceSummary";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { ChevronDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

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
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    eventDate: "",
    eventLocation: "",
    additionalInfo: ""
  });

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

  const handleContactInfoChange = (field: string, value: string) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
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

          <Collapsible open={isDeliveryOpen} onOpenChange={setIsDeliveryOpen}>
            <div className="border rounded-lg p-4">
              <CollapsibleTrigger className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-semibold text-quote-primary">Delivery / Pick Up</h2>
                <ChevronDown className={`h-6 w-6 transform transition-transform ${isDeliveryOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg">Do you need delivery?</h3>
                    <RadioGroup 
                      value={deliveryOption || ""} 
                      onValueChange={(value) => setDeliveryOption(value as "delivery" | "pickup")}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label htmlFor="delivery">YES, provide quote for delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">NO, I will pick up from your warehouse (COI Required)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {deliveryOption === "delivery" && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        Stage delivery prices start at $500 (round-trip) based on location and size order.
                      </p>
                    </div>
                  )}

                  {deliveryOption === "pickup" && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-quote-primary mb-2">Warehouse Will Call</h3>
                      <p className="text-gray-700">
                        Certificate Of Insurance (COI) Required from customer warehouse pick up - {" "}
                        <a 
                          href="https://www.etcrental.com/insurance-security/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-quote-accent hover:underline"
                        >
                          COI POLICY
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>

          <div className="border rounded-lg p-4 space-y-6">
            <h2 className="text-2xl font-semibold text-quote-primary">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={contactInfo.name}
                  onChange={(e) => handleContactInfoChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleContactInfoChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => handleContactInfoChange("phone", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={contactInfo.company}
                  onChange={(e) => handleContactInfoChange("company", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date *</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={contactInfo.eventDate}
                  onChange={(e) => handleContactInfoChange("eventDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventLocation">Event Location *</Label>
                <Input
                  id="eventLocation"
                  value={contactInfo.eventLocation}
                  onChange={(e) => handleContactInfoChange("eventLocation", e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                value={contactInfo.additionalInfo}
                onChange={(e) => handleContactInfoChange("additionalInfo", e.target.value)}
                placeholder="Please share any additional details about your event that will help us better serve you."
                className="min-h-[100px]"
              />
            </div>
          </div>
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