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
const HealthFactorComponent = ({ metadataFixture }) => (
  <ThemeProvider service="news" variant="default">
    <HealthFactor metadata={metadataFixture} />
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

export const HealthFactorWithCompleteDocs = () => (
  <HealthFactorComponent metadataFixture={allCompletedDocs} />
);

export const HealthFactorWithUncompleteDocs = () => (
  <HealthFactorComponent metadataFixture={threeOutstandingActions} />
);

export const HealthFactorWithMissingDocs = () => (
  <HealthFactorComponent metadataFixture={allMissingDocs} />
);

export const MissingHealthFactor = () => (
  <HealthFactorComponent metadataFixture={null} />
);
