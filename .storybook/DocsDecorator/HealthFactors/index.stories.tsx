import React from 'react';
import HealthFactors from '.';
import ThemeProvider from '../../../src/app/components/ThemeProvider';
import { allCompletedDocs, threeOutstandingActions } from './fixture';
import metadata from './metadata.json';
import md from './README.md';

// eslint-disable-next-line react/prop-types
const HealthFactorsComponent = ({ metadataFixture }) => (
  <ThemeProvider service="news" variant="default">
    <HealthFactors metadata={metadataFixture} />
  </ThemeProvider>
);

export default {
  title: 'components/HealthFactors/HealthFactorsComponent',
  component: HealthFactorsComponent,
  parameters: {
    metadata,
    docs: {
      component: {
        title: 'Health Factors',
      },
      page: md,
    },
  },
};

export const HealthFactorsWithCompleteDocs = () => (
  <HealthFactorsComponent metadataFixture={allCompletedDocs} />
);

export const HealthFactorsWithOutstandingDocs = () => (
  <HealthFactorsComponent metadataFixture={threeOutstandingActions} />
);

export const HealthFactorsWithNoData = () => (
  <HealthFactorsComponent metadataFixture={null} />
);
