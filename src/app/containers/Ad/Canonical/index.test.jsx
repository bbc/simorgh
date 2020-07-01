import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import CanonicalAd from './index';
import { RequestContextProvider } from '#contexts/RequestContext';

const requestContextData = {
  pageType: 'frontPage',
  service: 'pidgin',
  isAmp: false,
  pathname: '/pathname',
  data: { status: 200 },
  canAdvertise: true,
};

// eslint-disable-next-line react/prop-types
const CanonicalAdWithContext = () => (
  <BrowserRouter>
    <RequestContextProvider {...requestContextData}>
      <CanonicalAd slotType="leaderboard" />
    </RequestContextProvider>
  </BrowserRouter>
);

describe('CanonicalAds Ads', () => {
  beforeEach(() => {
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterEach(() => {
    window.dotcom = undefined;
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an Canonical leaderboard ad with dotcom-bootstrap script',
      <CanonicalAdWithContext />,
    );
  });
});
