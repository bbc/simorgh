import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import ThemeProvider from '../../../components/ThemeProvider';
import HiearchicalGrid from './index';
import pidginSummaries from './fixtures';

const Component = () => {
  return (
    <ThemeProvider service="pidgin">
      <ServiceContextProvider service="pidgin">
        <HiearchicalGrid
          summaries={pidginSummaries.slice(
            0,
            number('Promo Count', 12, { min: 3, max: 12 }),
          )}
        />
      </ServiceContextProvider>
    </ThemeProvider>
  );
};

export default {
  title: 'Topic/HierarchicalGrid',
  Component,
  decorators: [withKnobs],
};

export const HierarchicalGrid = Component;
