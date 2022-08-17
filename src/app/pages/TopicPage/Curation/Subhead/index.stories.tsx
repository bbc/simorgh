import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../../legacy/psammead/psammead-storybook-helpers/src';

import services from '../../../../../server/utilities/serviceConfigs';

import Subheading from '.';

type AllServices = {
  [t in Props['service']]: {
    [s in Props['variant']]: any;
  };
};

const allServices: AllServices = services;

interface Props {
  service: string;
  variant: string;
}

const Component = ({ service, variant }: Props) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Subheading>
        {allServices[service][variant].translations.relatedContent}
      </Subheading>
    </ServiceContextProvider>
  );
};

const WithLink = ({ service, variant }: Props) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <Subheading href="https://bbc.com">
        {allServices[service][variant].translations.relatedContent}
      </Subheading>
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
