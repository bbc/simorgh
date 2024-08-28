import React from 'react';
import { ServiceContextProvider } from '#contexts/ServiceContext';

import services from '../../../../server/utilities/serviceConfigs';
import ThemeProvider from '../../ThemeProvider';

import Subheading from '.';
import { StoryProps, StoryArgs } from '#models/types/storybook';

const Component = (_: StoryArgs, { service, variant }: StoryProps) => {
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

const WithLink = (_: StoryArgs, { service, variant }: StoryProps) => {
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
  title: 'Components/Curation/Subheading',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const ExampleWithLink = WithLink;
