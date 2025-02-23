
import React from "react";

interface QuoteHeaderProps {
  quoteRef: string;
  quoteDate: string;
  expirationDate: string;
}

const QuoteHeader = ({ quoteRef, quoteDate, expirationDate }: QuoteHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold mb-2">Stage Rental Quote</h1>
      <div className="text-sm space-y-1">
        <p>Quote Reference: {quoteRef}</p>
        <p>Date: {quoteDate}</p>
        <p className="font-semibold">Quote Expires: {expirationDate}</p>
      </div>
    </div>
  );
};

export default QuoteHeader;
