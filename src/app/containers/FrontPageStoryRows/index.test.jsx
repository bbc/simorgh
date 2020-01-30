import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { TopRow, LeadingRow, RegularRow } from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import getNumberPromoFixtures from './testHelpers';

const ImageRow = props => <RegularRow displayImages {...props} />;
const NoImageRow = props => <RegularRow {...props} />;

const getRow = (Type, service, dir, number) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      pathname="/pathname"
      pageType="frontPage"
      isAmp={false}
      service={service}
    >
      <Type stories={getNumberPromoFixtures(dir, number)} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('FrontPageStoryRows Container', () =>
  describe('snapshots', () => {
    shouldMatchSnapshot('TopRow', getRow(TopRow, 'news', 'ltr', 1));
    shouldMatchSnapshot('LeadingRow', getRow(LeadingRow, 'news', 'ltr', 2));
    shouldMatchSnapshot(
      'RegularRow with images',
      getRow(ImageRow, 'news', 'ltr', 4),
    );
    shouldMatchSnapshot(
      'RegularRow without images',
      getRow(NoImageRow, 'news', 'ltr', 4),
    );
  }));
