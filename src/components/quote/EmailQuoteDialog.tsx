
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface EmailQuoteDialogProps {
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
  deliveryDetails?: {
    deliveryDate: Date | null;
    deliveryTime: string | null;
    pickupDate: Date | null;
    pickupTime: string | null;
    venueName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    comments: string;
  };
  pickupDetails?: {
    warehouseLocation: "nj" | "ny" | null;
    pickupDate: Date | null;
    returnDate: Date | null;
    comments: string;
  };
  warehouseLocation: "nj" | "ny" | null;
}

const EmailQuoteDialog = ({ 
  quoteData,
  deliveryOption,
  deliveryDetails,
  pickupDetails,
  warehouseLocation,
}: EmailQuoteDialogProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateDimensions = () => {
    const { width, depth, height, days } = quoteData.dimensions;
    if (!width || width <= 0) {
      toast.error("Please specify a valid stage width");
      return false;
    }
    if (!depth || depth <= 0) {
      toast.error("Please specify a valid stage depth");
      return false;
    }
    if (!height || height <= 0) {
      toast.error("Please specify a valid stage height");
      return false;
    }
    if (!days || days <= 0) {
      toast.error("Please specify a valid rental duration");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!validateDimensions()) {
      setIsOpen(false);
      return;
    }

    if (!deliveryOption) {
      toast.error("Please select a delivery or pickup option before requesting a quote");
      setIsOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const { error: emailError } = await supabase.functions.invoke('send-quote-email', {
        body: {
          recipientEmail: email,
          recipientName: name,
          dimensions: quoteData.dimensions,
          selectedServices: quoteData.selectedServices,
          totalCost: quoteData.totalCost,
          dailyCosts: quoteData.dailyCosts,
          oneTimetCosts: quoteData.oneTimetCosts,
          hasDelivery: quoteData.hasDelivery,
          hasSetup: quoteData.hasSetup,
          hasCarpet: quoteData.hasCarpet,
          hasWarehouseFee: quoteData.hasWarehouseFee,
          deliveryOption,
          deliveryDetails,
          pickupDetails,
          warehouseLocation,
        },
      });

      if (emailError) {
        if (emailError.message.includes("Rate limit exceeded")) {
          toast.error("Too many quote requests. Please try again later.");
        } else {
          toast.error("Failed to send email");
          console.error("Email error:", emailError);
        }
        return;
      }

      toast.success("Quote has been sent to your email!");
      setIsOpen(false);
      setEmail("");
      setName("");
    } catch (error) {
      console.error("Quote email error:", error);
      toast.error("An error occurred while processing your quote");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (open && !deliveryOption) {
      toast.error("Please select a delivery or pickup option before requesting a quote");
      return;
    }
    if (open && !validateDimensions()) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-quote-primary text-quote-primary hover:bg-quote-primary/10">
          Email Me Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Email Quote</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Quote"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailQuoteDialog;
