import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import isLive from '#lib/utilities/isLive';
import CanonicalAd, { getBootstrapSrc, getBootstrapLegacySrc } from '.';

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  [
    {
      queryString: '?ads-js-env=live',
      isLiveValue: false,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    },
    {
      queryString: '?invalid-string',
      isLiveValue: true,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap.js',
    },
    {
      queryString: '',
      isLiveValue: false,
      bootstrapSrc:
        'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap.js',
    },
  ].forEach(({ queryString, isLiveValue, bootstrapSrc }) => {
    it(`should return ${bootstrapSrc} when queryString=${queryString} and isLive=${isLiveValue}`, () => {
      isLive.mockImplementationOnce(() => isLiveValue);
      expect(getBootstrapSrc(queryString)).toEqual(bootstrapSrc);
    });
  });
});

describe('getBootstrapLegacySrc', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  [
    {
      queryString: '?ads-js-env=live',
      isLiveValue: false,
      bootstrapLegacySrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js',
    },
    {
      queryString: '?invalid-string',
      isLiveValue: true,
      bootstrapLegacySrc:
        'https://gn-web-assets.api.bbc.com/ngas/dotcom-bootstrap-legacy.js',
    },
    {
      queryString: '',
      isLiveValue: false,
      bootstrapLegacySrc:
        'https://gn-web-assets.api.bbc.com/ngas/test/dotcom-bootstrap-legacy.js',
    },
  ].forEach(({ queryString, isLiveValue, bootstrapLegacySrc }) => {
    it(`should return ${bootstrapLegacySrc} when queryString=${queryString} and isLive=${isLiveValue}`, () => {
      isLive.mockImplementationOnce(() => isLiveValue);
      expect(getBootstrapLegacySrc(queryString)).toEqual(bootstrapLegacySrc);
    });
  });
});
