import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';
import { Services, Variants } from '../../models/types/global';
import MessageBanner from '.';
import { kyrgyzMessageBannerOnePromo } from './fixtures';

interface Props {
  service: Services;
  variant: Variants;
}

const Component = ({ service, variant }: Props) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={kyrgyzMessageBannerOnePromo.summaries[0].description}
          link={kyrgyzMessageBannerOnePromo.summaries[0].link}
          linkText={kyrgyzMessageBannerOnePromo.summaries[0].title}
          image={kyrgyzMessageBannerOnePromo.summaries[0].imageUrl}
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
