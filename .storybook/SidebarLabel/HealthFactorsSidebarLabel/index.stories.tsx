import React from 'react';
import HealthFactorsSidebarLabel from '.';
import metadata from './metadata.json';
import md from './README.md';

export default {
  title: 'components/HealthFactors/HealthFactorsSidebarLabel',
  component: HealthFactorsSidebarLabel,
  parameters: {
    metadata,
    docs: {
      component: {
        title: 'Health Factors Sidebar',
      },
      page: md,
    },
  },
};

export const CompletedSidebar = () => (
  <HealthFactorsSidebarLabel
    metadata={{
      uxAccessibilityDoc: {
        done: true,
      },
      acceptanceCriteria: {
        done: true,
      },
      swarm: {
        done: true,
      },
    }}
    name={'test_name'}
  />
);

export const OutstandingActionsSidebar = () => (
  <HealthFactorsSidebarLabel
    metadata={{
      uxAccessibilityDoc: {
        done: false,
      },
      acceptanceCriteria: {
        done: false,
      },
      swarm: {
        done: false,
      },
    }}
    name={'test_name'}
  />
);

export const missingSidebar = () => (
  <HealthFactorsSidebarLabel metadata={null} name={'test_name'} />
);
