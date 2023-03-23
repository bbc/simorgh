import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import md from './README.md';
import VisuallyHiddenText from '.';
import ThemeProvider from '../ThemeProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { Services, Variants } from '../../models/types/global';

interface Props {
  service: Services;
  variant: Variants;
  text: string;
}

const VisuallyHiddenTextStory = ({ service, variant, text }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <VisuallyHiddenText>{text}</VisuallyHiddenText>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Visually Hidden Text',
  Component: VisuallyHiddenText,
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

export const Example = VisuallyHiddenTextStory;
