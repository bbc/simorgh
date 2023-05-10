import React from 'react';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#app/legacy/psammead/psammead-storybook-helpers/src';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { StoryProps } from '#models/types/storybook';
import Live from './LivePageLayout';

const mockPageData = {
  pageCount: 10,
  activePage: 1,
  someResponse: {
    block: 'Its a block',
  },
};

const Component = ({ service, variant }: StoryProps) => (
  <ServiceContextProvider service={service} variant={variant}>
    <PageLayoutWrapper pageData={mockPageData} status={200}>
      <Live pageData={mockPageData} />
    </PageLayoutWrapper>
  </ServiceContextProvider>
);

export default {
  title: 'Pages/Live Page',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = Component;
