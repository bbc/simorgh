import React from 'react';

import HierarchicalGrid from './index';
import pidginPromos from './fixtures';

const Component = () => {
  return (
    <HierarchicalGrid
      headingLevel={2}
      summaries={pidginPromos.slice(
        0,
        // number('Promo Count', 12, { min: 3, max: 12 }),
        12,
      )}
    />
  );
};

export default {
  title: 'Components/Curation/Grid - Hierarchical',
  Component,
};

export const Example = Component;
