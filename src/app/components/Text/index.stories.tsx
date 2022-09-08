import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services, Variants } from '../../models/types/global';
import ThemeProvider from '../ThemeProvider';
import Text from '.';
import Paragraph from '../Paragraph';
import Heading from '../Heading';

interface Props {
  service: Services;
  variant: Variants;
  text: string;
}

const a11yTestingStory = ({ service, variant }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <div>
          <Text>This is some text rendered in a span element.</Text>
        </div>
        <div>
          <Text fontVariant="serifRegular" size="canon">
            This is some text rendered in a span in a serif font in canon size.
          </Text>
        </div>
        <div>
          <Text as="strong">
            This is some text rendered in a strong element.
          </Text>
        </div>
        <div>
          <Paragraph>This is some text rendered in a paragraph.</Paragraph>
        </div>
        <div>
          <Paragraph
            fontVariant="sansBold"
            size="greatPrimer"
            css={{ color: 'red' }}
          >
            This is some text rendered in a paragraph in a sans-serif bold font
            in greatPrimer size in a red colour.
          </Paragraph>
        </div>
        <div>
          <Heading level={1}>
            This is some text rendered in a h1 element.
          </Heading>
        </div>
        <div>
          <Heading level={2} fontVariant="serifBold">
            This is some text rendered in a h2 element in a serif bold font.
          </Heading>
        </div>
        <div>
          <Heading level={4} size="pica" tabIndex={-1}>
            This is some text rendered in a h4 element in a pica size.
          </Heading>
        </div>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'NewComponents/TypographyA11yTesting',
  Component: a11yTestingStory,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Example = a11yTestingStory;
