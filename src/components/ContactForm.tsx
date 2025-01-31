import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  company: string;
  eventDate: string;
  eventLocation: string;
  additionalInfo: string;
}

interface ContactFormProps {
  contactInfo: ContactInfo;
  onContactInfoChange: (field: string, value: string) => void;
}

const ContactForm = ({ contactInfo, onContactInfoChange }: ContactFormProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-quote-primary">Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={contactInfo.name}
            onChange={(e) => onContactInfoChange("name", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={contactInfo.email}
            onChange={(e) => onContactInfoChange("email", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => onContactInfoChange("phone", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={contactInfo.company}
            onChange={(e) => onContactInfoChange("company", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventDate">Event Date *</Label>
          <Input
            id="eventDate"
            type="date"
            value={contactInfo.eventDate}
            onChange={(e) => onContactInfoChange("eventDate", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventLocation">Event Location *</Label>
          <Input
            id="eventLocation"
            value={contactInfo.eventLocation}
            onChange={(e) => onContactInfoChange("eventLocation", e.target.value)}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          value={contactInfo.additionalInfo}
          onChange={(e) => onContactInfoChange("additionalInfo", e.target.value)}
          placeholder="Please share any additional details about your event that will help us better serve you."
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default ContactForm;