
import { Section, Heading, Text, Img } from 'npm:@react-email/components@0.0.12';
import * as React from 'npm:react@18.3.1';
import { section, subheader, text, diagramContainer, diagram } from '../styles';

interface StageSpecificationsProps {
  dimensions: {
    width: number;
    depth: number;
    height: number;
    days: number;
  };
  stageLayoutImage?: string;
}

export const StageSpecifications = ({ dimensions, stageLayoutImage }: StageSpecificationsProps) => (
  <Section style={section}>
    <Heading as="h2" style={subheader}>Stage Specifications</Heading>
    <Text style={text}>
      <strong>Size:</strong> {dimensions.width}' × {dimensions.depth}' × {dimensions.height}"
    </Text>
    <Text style={text}>
      <strong>Rental Duration:</strong> {dimensions.days} {dimensions.days === 1 ? 'day' : 'days'}
    </Text>
    {stageLayoutImage && (
      <div style={diagramContainer}>
        <Img
          src={stageLayoutImage}
          width="100%"
          height="auto"
          alt="Stage Layout Diagram"
          style={diagram}
        />
      </div>
    )}
  </Section>
);
