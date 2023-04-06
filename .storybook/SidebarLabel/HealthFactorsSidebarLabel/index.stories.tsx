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

export const Completed = () => (
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
    name="Component name"
  />
);

export const OutstandingActions = () => (
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
    name="Component name"
  />
);

export const Missing = () => (
  <HealthFactorsSidebarLabel name="Component name" />
);
