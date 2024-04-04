import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { withServicesKnob } from '../../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../../ThemeProvider';
import HierarchicalGrid from './index';
import pidginPromos from './fixtures';
import { StoryProps } from '../../../models/types/storybook';

const Component = ({ service, variant }: StoryProps) => {
  return (
    <ThemeProvider service={service} variant={variant}>
      <ServiceContextProvider service={service} variant={variant}>
        <HierarchicalGrid
          headingLevel={2}
          summaries={pidginPromos.slice(
            0,
            number('Promo Count', 12, { min: 3, max: 12 }),
          )}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'New Components/Curation/Grid - Hierarchical',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = Component;
