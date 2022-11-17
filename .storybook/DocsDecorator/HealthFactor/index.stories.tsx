import React from 'react';
import HealthFactor from '.';
import ThemeProvider from '../../../src/app/components/ThemeProvider';
import {
  allCompletedDocs,
  threeOutstandingActions,
  allMissingDocs,
} from './fixture';
import metadata from './metadata.json';
import md from './HealthFactor.md';

// eslint-disable-next-line react/prop-types
const HealthFactorComponent = ({ metadata }) => (
  <ThemeProvider service="news" variant="default">
    <HealthFactor metadata={metadata} />
  </ThemeProvider>
);

export default {
  title: 'components/HealthFactor',
  component: HealthFactorComponent,
  parameters: {
    metadata,
    docs: {
      component: {
        title: 'Health Factor',
      },
      page: md,
    },
  },
};

export const HealthFactorWithCompleteDocs = props => (
  <HealthFactorComponent metadata={allCompletedDocs} />
);

export const HealthFactorWithUncompleteDocs = props => (
  <HealthFactorComponent metadata={threeOutstandingActions} />
);

export const HealthFactorWithMissingDocs = props => (
  <HealthFactorComponent metadata={allMissingDocs} />
);

export const MissingHealthFactor = props => (
  <HealthFactorComponent metadata={null} />
);
