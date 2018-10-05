import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import MetadataContainer from './index';
import { ServiceContextProvider } from '../../components/ServiceContext';
import { articleDataNews } from '../Article/fixtureData';

describe('MetadataContainer', () => {
  const { metadata, promo } = articleDataNews;

  const MetadataWithContext = () => (
    <ServiceContextProvider service="news">
      <MetadataContainer
        isAmp={false}
        metadata={metadata}
        promo={promo}
        service="news"
      />
    </ServiceContextProvider>
  );

  shouldShallowMatchSnapshot('should render correctly', MetadataWithContext());
});
