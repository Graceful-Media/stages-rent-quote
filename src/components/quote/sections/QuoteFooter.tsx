
import React from "react";

const QuoteFooter = () => {
  return (
    <div className="mt-12 text-sm space-y-6">
      <div>
        <p className="font-medium mb-2">Terms & Conditions:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Quote valid for 3 days from the date listed</li>
          <li>50% deposit required to secure booking</li>
          <li>Final payment due 30 days before event date. If your event date is less than 30 days away, full payment is required.</li>
          <li>Certificate of Insurance may be required, naming Pro AV Source, LLC as additional insured.</li>
          <li>Cancellation fees may apply</li>
        </ul>
      </div>
      <div>
        <p className="font-medium mb-2">Contact Information:</p>
        <p>Pro AV Source</p>
        <p>www.Stages.rent</p>
        <p>(646) 733-8576 - Mon - Sat - 10am - 5pm EST</p>
        <p>quotes@proavsource.com</p>
      </div>
    </div>
  );
};

export default QuoteFooter;
