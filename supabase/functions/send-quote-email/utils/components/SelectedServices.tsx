
import { Section, Heading } from 'npm:@react-email/components@0.0.7';
import * as React from 'npm:react@18.3.1';
import { section, subheader, list, listItem } from '../styles.ts';

interface SelectedServicesProps {
  services: string[];
}

export const SelectedServices = ({ services }: SelectedServicesProps) => (
  services.length > 0 ? (
    <Section style={section}>
      <Heading as="h2" style={subheader}>Selected Services</Heading>
      <ul style={list}>
        {services.map((service, index) => (
          <li key={index} style={listItem}>{service}</li>
        ))}
      </ul>
    </Section>
  ) : null
);
