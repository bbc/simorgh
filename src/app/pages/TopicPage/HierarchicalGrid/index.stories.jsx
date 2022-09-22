import React from 'react';

import { withKnobs, number } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

import HiearchicalGrid from './index';
import pidginSummaries from './fixtures';

const Component = () => {
  return (
    <div style={{ backgroundColor: '#f2f2f2' }}>
      <ServiceContextProvider service="pidgin">
        <HiearchicalGrid
          summaries={pidginSummaries.slice(
            0,
            number('Promo Count', 12, { min: 3, max: 12 }),
          )}
        />
      </ServiceContextProvider>
    </div>
  );
};

export default {
  title: 'Topic/HierarchicalGrid',
  Component,
  decorators: [withKnobs],
};

export const HierarchicalGrid = Component;
