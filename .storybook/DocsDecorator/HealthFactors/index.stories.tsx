import React from 'react';
import HealthFactors from '.';
import { allCompletedDocs, threeOutstandingActions } from './fixture';
import metadata from './metadata.json';
import readme from './README.md';

export default {
  title: 'components/HealthFactors/HealthFactorsComponent',
  component: HealthFactors,
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const HealthFactorsWithCompleteDocs = () => (
  <HealthFactors metadata={allCompletedDocs} />
);

export const HealthFactorsWithOutstandingDocs = () => (
  <HealthFactors metadataFixture={threeOutstandingActions} />
);

export const HealthFactorsWithNoData = () => (
  <HealthFactors metadataFixture={null} />
);
