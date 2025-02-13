
export const generateQuoteEmailHtml = ({
  dimensions,
  selectedServices,
  totalCost,
  deliveryOption,
  deliveryZipCode,
  warehouseLocation,
}: {
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  selectedServices: string[];
  totalCost: number;
  deliveryOption?: string;
  deliveryZipCode?: string;
  warehouseLocation?: string;
}) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #333; text-align: center;">Your Stage Rental Quote</h1>
    
    <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #444; margin-bottom: 15px;">Stage Specifications</h2>
      <p><strong>Size:</strong> ${dimensions.width}' × ${dimensions.depth}' × ${dimensions.height}"</p>
      <p><strong>Rental Duration:</strong> ${dimensions.days} ${dimensions.days === 1 ? 'day' : 'days'}</p>
    </div>

    ${selectedServices.length > 0 ? `
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #444; margin-bottom: 15px;">Selected Services</h2>
        <ul style="list-style-type: none; padding: 0;">
          ${selectedServices.map(service => `<li style="margin: 5px 0;">• ${service}</li>`).join('')}
        </ul>
      </div>
    ` : ''}

    ${deliveryOption ? `
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h2 style="color: #444; margin-bottom: 15px;">Delivery Details</h2>
        <p><strong>Delivery Option:</strong> ${deliveryOption}</p>
        ${deliveryZipCode ? `<p><strong>Delivery Zip Code:</strong> ${deliveryZipCode}</p>` : ''}
        ${warehouseLocation ? `<p><strong>Warehouse Location:</strong> ${warehouseLocation.toUpperCase()}</p>` : ''}
      </div>
    ` : ''}

    <div style="background-color: #e8f4ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #444; margin-bottom: 15px;">Total Quote</h2>
      <p style="font-size: 24px; font-weight: bold; color: #333; text-align: center;">
        $${totalCost.toFixed(2)}
      </p>
      <p style="font-size: 12px; color: #666; text-align: center; margin-top: 10px;">
        *Final price may vary based on event details and location
      </p>
    </div>

    <div style="text-align: center; margin-top: 30px;">
      <p style="color: #666;">
        Thank you for choosing our stage rental services. If you have any questions or would like to proceed with this quote, 
        <a href="mailto:quotes@proavsource.com" style="color: #0066cc; text-decoration: none;">please contact us.</a>
      </p>
      <p style="color: #666;">
        <strong>Phone:</strong> (646) 661-4078<br>
        <strong>Email:</strong> <a href="mailto:quotes@proavsource.com" style="color: #0066cc; text-decoration: none;">quotes@proavsource.com</a>
      </p>
    </div>
  </div>
`;
