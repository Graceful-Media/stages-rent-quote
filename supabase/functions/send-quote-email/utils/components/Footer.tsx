
import { Section, Text, Link } from 'npm:@react-email/components@0.0.12';
import * as React from 'npm:react@18.3.1';
import { footer, footerText, footerSmallText, link } from '../styles';

export const Footer = () => (
  <Section style={footer}>
    <Text style={footerText}>
      Thank you for choosing Stage Rentals for your event needs. Our commitment to quality and service sets us apart.
    </Text>
    <Text style={footerText}>
      <strong>Contact Us</strong>
    </Text>
    <Text style={footerText}>
      <strong>Phone:</strong> (646) 661-4078
    </Text>
    <Text style={footerText}>
      <strong>Email:</strong>{' '}
      <Link href="mailto:quotes@proavsource.com" style={link}>
        quotes@proavsource.com
      </Link>
    </Text>
    <Text style={footerText}>
      <strong>Website:</strong>{' '}
      <Link href="https://www.stages.rent" style={link}>
        www.stages.rent
      </Link>
    </Text>
    <Text style={footerSmallText}>
      © {new Date().getFullYear()} Pro AV Source, LLC. All rights reserved.
    </Text>
    <Text style={footerSmallText}>
      Stages.rent is a registered service owned and operated by Pro AV Source LLC.
    </Text>
  </Section>
);
