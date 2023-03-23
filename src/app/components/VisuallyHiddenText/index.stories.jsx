import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import notes from '../README.md';
import VisuallyHiddenText from '.';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import ThemeProvider from '../ThemeProvider';

const VisuallyHiddenTextStory = ({
  service,
  variant,
  text = 'Visually Hidden Text',
}) => (
  <ThemeProvider service={service} variant={variant}>
    <ServiceContextProvider service={service} variant={variant}>
      <VisuallyHiddenText>{text}</VisuallyHiddenText>
    </ServiceContextProvider>
  </ThemeProvider>
);

export default {
  title: 'New Components/Visually Hidden Text',
  Component: TextStory,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: {
      component: {
        title: 'Visually Hidden Text',
      },
      page: md,
    },
  },
};

export const Example = TextStory;
