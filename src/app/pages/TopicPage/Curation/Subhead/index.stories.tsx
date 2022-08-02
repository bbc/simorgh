import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../../legacy/psammead/psammead-storybook-helpers/src';

import Subheading from '.';

interface Props {
  service: string;
  variant: string;
}

const Component = ({ service, variant }: Props) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Subheading>These are the children</Subheading>
    </ServiceContextProvider>
  );
};

const WithLink = ({ service, variant }: Props) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Subheading href="https://bbc.com">These are the children</Subheading>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Curations/Subheading',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const ExampleWithLink = WithLink;
