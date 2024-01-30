import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';

import services from '../../../../server/utilities/serviceConfigs';
import ThemeProvider from '../../ThemeProvider';

import Subheading from '.';
import { StoryProps } from '../../../models/types/storybook';

const Component = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Subheading>
          {services[service][variant].translations.relatedContent}
        </Subheading>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

const WithLink = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <Subheading link="https://bbc.com">
          {services[service][variant].translations.relatedContent}
        </Subheading>
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Curation/Subheading',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const ExampleWithLink = WithLink;
