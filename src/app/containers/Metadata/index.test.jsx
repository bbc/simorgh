import React from 'react';
import { shouldShallowMatchSnapshot } from '../../helpers/tests/testHelpers';
import MetadataContainer from './index';
import { ServiceContextProvider } from '../../components/ServiceContext';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

const MetadataWithContext = (service, serviceFixtureData) => {
  const { metadata, promo } = serviceFixtureData;

  return (
    <ServiceContextProvider service={service}>
      <MetadataContainer
        isAmp={false}
        metadata={metadata}
        promo={promo}
        service={service}
      />
    </ServiceContextProvider>
  );
};

describe('MetadataContainer', () => {
  shouldShallowMatchSnapshot(
    'should render correctly for news',
    MetadataWithContext('news', articleDataNews),
  );

  shouldShallowMatchSnapshot(
    'should render correctly for persian',
    MetadataWithContext('persian', articleDataPersian),
  );
});

describe('no data', () => {
  shouldShallowMatchSnapshot(
    'should render null',
    <MetadataContainer isAmp={false} metadata={{}} promo={{}} service="" />,
  );
});
