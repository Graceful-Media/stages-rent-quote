
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
  deliveryOption?: "delivery" | "pickup" | null;
  deliveryZipCode?: string | null;
  warehouseLocation?: "nj" | "ny" | null;
  deliveryDate?: Date | null;
  deliveryTime?: string | null;
  pickupDate?: Date | null;
  pickupTime?: string | null;
  stageLayoutImage?: string;
  deliveryDetails?: {
    venueName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
  };
}

const EmailQuoteDialog = ({ 
  quoteData,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
  deliveryDate,
  deliveryTime,
  pickupDate,
  pickupTime,
  stageLayoutImage,
  deliveryDetails,
}: EmailQuoteDialogProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
          deliveryZipCode,
          warehouseLocation,
          deliveryDate,
          deliveryTime,
          pickupDate,
          pickupTime,
          stageLayoutImage,
          ...deliveryDetails,
        },
      });

      if (emailError) {
        if (emailError.message.includes("Rate limit exceeded")) {
          toast.error("Too many quote requests. Please try again later.");
        } else {
          toast.error("Failed to send email");
        }
        return;
      }

      toast.success("Quote has been sent to your email!");
      setIsOpen(false);
      setEmail("");
      setName("");
    } catch (error) {
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
