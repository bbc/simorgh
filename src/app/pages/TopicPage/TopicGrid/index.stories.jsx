import React from 'react';
import { withServicesKnob } from '#legacy/psammead-storybook-helpers/src';
import { withKnobs } from '@storybook/addon-knobs';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import TopicGrid from '.';

// eslint-disable-next-line react/prop-types
const Component = ({ service, variant }) => {
  return (
    <ServiceContextProvider service={service} variant={variant}>
      <TopicGrid promos={fixture.data.summaries} />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Topic/Grid',
  Component,
  decorators: [withKnobs, withServicesKnob()],
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
