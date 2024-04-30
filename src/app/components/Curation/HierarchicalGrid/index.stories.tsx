import React from 'react';

import HierarchicalGrid from './index';
import pidginPromos from './fixtures';

const Component = ({ promoCount }: { promoCount: number }) => {
  return (
    <HierarchicalGrid
      headingLevel={2}
      summaries={pidginPromos.slice(0, promoCount)}
    />
  );
};

export default {
  title: 'Components/Curation/Grid - Hierarchical',
  Component,
  args: {
    promoCount: 12,
  },
  argTypes: {
    promoCount: {
      control: {
        type: 'range',
        min: 3,
        max: 12,
        step: 1,
      },
    },
  },
};

export const Example = Component;
