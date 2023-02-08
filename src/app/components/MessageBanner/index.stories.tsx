import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import { Services, Variants } from '../../models/types/global';
import MessageBanner from '.';
import kyrgyzBanner from './fixtures';

interface Props {
  service: Services;
  variant: Variants;
}

const { summaries } = kyrgyzBanner;

const Component = ({ service, variant }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <MessageBanner
          summaries={summaries}
          title={kyrgyzBanner.title}
          position={kyrgyzBanner.position}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/MessageBanner',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = Component;
