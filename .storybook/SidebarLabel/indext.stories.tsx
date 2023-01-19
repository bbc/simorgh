import React from 'react';
import SidebarLabel from '.';

export default {
  title: 'addon/SidebarLabel',
  component: SidebarLabel,
};

export const SidebarLabelPositive = () => (
  <SidebarLabel
    item={{
      type: 'component',
      id: 'components-healthfactors',
      name: 'HealthFactors',
      parent: 'components',
      depth: 1,
      children: [
        'components-healthfactors--health-factors-with-complete-docs',
        'components-healthfactors--health-factors-with-outstanding-docs',
        'components-healthfactors--health-factors-with-invalid-data',
        'components-healthfactors--health-factors-with-no-data',
      ],
      isComponent: true,
      isLeaf: false,
      isRoot: false,
    }}
  />
);
