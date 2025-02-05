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
  };
  deliveryOption?: "delivery" | "pickup" | null;
  deliveryZipCode?: string | null;
  warehouseLocation?: "nj" | "ny" | null;
}

const EmailQuoteDialog = ({ 
  quoteData,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
}: EmailQuoteDialogProps) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to send quotes");
        return;
      }

      // Save quote to database
      const { error: dbError } = await supabase
        .from('quotes')
        .insert({
          user_id: user.id,
          dimensions: quoteData.dimensions,
          selected_services: quoteData.selectedServices,
          total_cost: quoteData.totalCost,
          delivery_option: deliveryOption,
          delivery_zip_code: deliveryZipCode,
          warehouse_location: warehouseLocation,
          recipient_email: email,
        });

      if (dbError) {
        console.error("Error saving quote:", dbError);
        toast.error("Failed to save quote");
        return;
      }

      // Send email
      const { error: emailError } = await supabase.functions.invoke('send-quote-email', {
        body: {
          recipientEmail: email,
          dimensions: quoteData.dimensions,
          selectedServices: quoteData.selectedServices,
          totalCost: quoteData.totalCost,
          deliveryOption,
          deliveryZipCode,
          warehouseLocation,
        },
      });

      if (emailError) {
        console.error("Error sending email:", emailError);
        toast.error("Failed to send email");
        return;
      }

      toast.success("Quote has been sent to your email!");
      setIsOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Error in quote process:", error);
      toast.error("An error occurred while processing your quote");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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