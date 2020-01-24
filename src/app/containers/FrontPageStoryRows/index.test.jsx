import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { pathOr, take } from 'ramda';
import { TopRow, LeadingRow, RegularRow } from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import fixture from '#data/pidgin/frontpage';
import rtlFixture from '#data/urdu/frontpage';

const getFixture = dir => (dir === 'ltr' ? fixture : rtlFixture);

const promoFixtures = dir =>
  pathOr(null, ['content', 'groups'], getFixture(dir))
    .flatMap(group => pathOr(null, ['items'], group))
    .filter(item => pathOr(null, ['assetTypeCode'], item) === 'PRO');

const standardPromos = (dir, number) =>
  take(number, promoFixtures('Text', dir));

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
