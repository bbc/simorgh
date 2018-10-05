import React from 'react';
import { shouldMatchSnapshot } from '../../helpers/tests/testHelpers';
import MetadataContainer from './index';
import { ServiceContextProvider } from '../../components/ServiceContext';
import { articleDataNews } from '../Article/fixtureData';
import newsServiceContextStub from '../../lib/config/services/news';

describe('MetadataContainer', () => {
  const { metadata, promo } = articleDataNews;

  const MetadataWithContext = () => (
    <ServiceContextProvider service="news">
      <MetadataContainer
        amp={false}
        metadata={metadata}
        promo={promo}
        service={'news'}
      />
    </ServiceContextProvider>
  );

  shouldMatchSnapshot(
    'should render correctly', MetadataWithContext()
  );
});
