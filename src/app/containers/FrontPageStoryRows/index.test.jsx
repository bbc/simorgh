import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { take } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import getPromoFixtures from './testHelpers';

const standardPromos = (dir, number) => take(number, getPromoFixtures(dir));

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
      <Type stories={standardPromos(dir, number)} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

describe('FrontPageStoryRows Container', () =>
  describe('snapshots', () => {
    shouldMatchSnapshot('TopRow', getRow(TopRow, 'news', 'ltr', 1));
    shouldMatchSnapshot('LeadingRow', getRow(LeadingRow, 'news', 'ltr', 2));
    shouldMatchSnapshot('RegularRow', getRow(RegularRow, 'news', 'ltr', 4));
  }));
