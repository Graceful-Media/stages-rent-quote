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
}

const EmailQuoteDialog = ({ quoteData }: EmailQuoteDialogProps) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      // Here you would typically send this to your backend
      console.log("Sending quote to email:", email, "Quote data:", quoteData);
      
      toast.success("Quote has been sent to your email!");
      setIsOpen(false);
      setEmail("");
    } catch (error) {
      console.error("Error sending quote:", error);
      toast.error("Failed to send quote. Please try again later.");
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
          <Button type="submit" className="w-full">
            Send Quote
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailQuoteDialog;