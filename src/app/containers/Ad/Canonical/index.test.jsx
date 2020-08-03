import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import isLive from '#lib/utilities/isLive';
import CanonicalAd, { getBootstrapSrc } from '.';

const mockTestScript = 'http://mock-test-script';
const mockTestScriptLegacy = 'http://mock-test-script-legacy';
const mockLiveScript = 'http://mock-live-script';
const mockLiveScriptLegacy = 'http://mock-live-script-legacy';

describe('CanonicalAds Ads', () => {
  beforeEach(() => {
    process.env.SIMORGH_ADS_SCRIPT_TEST = mockTestScript;
    process.env.SIMORGH_ADS_SCRIPT_LEGACY_TEST = mockTestScriptLegacy;
    process.env.SIMORGH_ADS_SCRIPT_LIVE = mockLiveScript;
    process.env.SIMORGH_ADS_SCRIPT_LEGACY_LIVE = mockLiveScriptLegacy;

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
      <BrowserRouter>
        <CanonicalAd slotType="leaderboard" />
      </BrowserRouter>,
    );

    shouldMatchSnapshot(
      'should correctly render a Canonical mpu ad with dotcom-bootstrap script',
      <BrowserRouter>
        <CanonicalAd slotType="mpu" />
      </BrowserRouter>,
    );
  });
});

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('getBootstrapSrc', () => {
  beforeEach(() => {
    process.env.SIMORGH_ADS_SCRIPT_TEST = mockTestScript;
    process.env.SIMORGH_ADS_SCRIPT_LEGACY_TEST = mockTestScriptLegacy;
    process.env.SIMORGH_ADS_SCRIPT_LIVE = mockLiveScript;
    process.env.SIMORGH_ADS_SCRIPT_LEGACY_LIVE = mockLiveScriptLegacy;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return live script when on live environment', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('')).toBe(mockLiveScript);
  });

  it('should return live legacy script when on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('', true)).toBe(mockLiveScriptLegacy);
  });

  it('should return test script when not on live environment', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('')).toBe(mockTestScript);
  });

  it('should return test legacy script when not on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('?invalid-query', true)).toBe(mockTestScriptLegacy);
  });

  it('should return live script when not on live environment and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live')).toBe(mockLiveScript);
  });

  it('should return live legacy script when not on live environment and legacy is true and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live', true)).toBe(mockLiveScriptLegacy);
  });
});
