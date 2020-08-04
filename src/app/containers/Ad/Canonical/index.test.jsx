import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import isLive from '#lib/utilities/isLive';
import CanonicalAd, { getBootstrapSrc } from '.';

const requestContextData = {
  pageType: 'frontPage',
  service: 'pidgin',
  isAmp: false,
  pathname: '/pathname',
  data: { status: 200 },
  canAdvertise: true,
};

// eslint-disable-next-line react/prop-types
const CanonicalAdWithContext = ({ slotType }) => (
  <BrowserRouter>
    <RequestContextProvider {...requestContextData}>
      <CanonicalAd slotType={slotType} />
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
      <CanonicalAdWithContext slotType="leaderboard" />,
    );

    shouldMatchSnapshot(
      'should correctly render a Canonical mpu ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAdWithContext slotType="mpu" />
      </BrowserRouter>,
    );
  });
});

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('getBootstrapSrc', () => {
  it('should return live script when on live environment', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    );
  });

  it('should return live legacy script when on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js',
    );
  });

  it('should return test script when not on live environment', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js',
    );
  });

  it('should return test legacy script when not on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('?invalid-query', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap-legacy.js',
    );
  });

  it('should return live script when not on live environment and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    );
  });

  it('should return live legacy script when not on live environment and legacy is true and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js',
    );
  });
});
