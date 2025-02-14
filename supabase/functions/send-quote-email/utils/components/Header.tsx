
import { Section, Img } from 'npm:@react-email/components@0.0.12';
import * as React from 'npm:react@18.3.1';

export const Header = () => (
  <Section style={headerSection}>
    <Img
      src="https://www.stages.rent/storage/2022/06/Stage-Rent-Logo.png"
      width="200"
      height="auto"
      alt="Stage Rentals Logo"
      style={logo}
    />
  </Section>
);

const headerSection = {
  textAlign: 'center' as const,
  padding: '20px 0',
};

const logo = {
  margin: '0 auto',
};
