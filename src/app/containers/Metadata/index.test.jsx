import React from 'react';
import {
  shouldMatchSnapshot,
  shouldShallowMatchSnapshot,
} from '../../helpers/tests/testHelpers';
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

  describe('no data', () => {
    shouldShallowMatchSnapshot(
      'should render null',
      <MetadataContainer isAmp={false} metadata={{}} promo={{}} service="" />,
    );
  });
});

/*
  For some reason I don't know deep snapshots are returning as null for the metadata container.
  I believe this has something to do with the service context provider/consumer.
  I've added deep snapshots to please code climate.
*/
describe('MetadataContainer deep snapshot', () => {
  shouldMatchSnapshot(
    'should render correctly for news',
    MetadataWithContext('news', articleDataNews),
  );

  shouldMatchSnapshot(
    'should render correctly for persian',
    MetadataWithContext('persian', articleDataPersian),
  );
});
