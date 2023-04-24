import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContext } from '#contexts/RequestContext';
import isLive from '#lib/utilities/isLive';
import { render } from '../../../../components/react-testing-library-with-providers';
import CanonicalAd, { getBootstrapSrc } from '.';

const defaultRequestContextData = {
  showAdsBasedOnLocation: true,
};

/* eslint-disable react/prop-types */
const CanonicalAdWithContext = ({
  slotType,
  requestContext = defaultRequestContextData,
}) => (
  <BrowserRouter>
    <RequestContext.Provider value={requestContext}>
      <CanonicalAd slotType={slotType} />
    </RequestContext.Provider>
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

  describe('Assertions', () => {
    it('should return null when showAdsBasedOnLocation is false', () => {
      const requestContext = {
        showAdsBasedOnLocation: false,
      };

      const { container } = render(
        <CanonicalAdWithContext
          slotType="leaderboard"
          requestContext={requestContext}
        />,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Snapshots', () => {
    it('should correctly render an Canonical leaderboard ad with dotcom-bootstrap script', () => {
      const { container } = render(
        <CanonicalAdWithContext slotType="leaderboard" />,
      );
      expect(container).toMatchSnapshot();
    });

    it('should correctly render a Canonical mpu ad with dotcom-bootstrap script', () => {
      const { container } = render(<CanonicalAdWithContext slotType="mpu" />);
      expect(container).toMatchSnapshot();
    });
  });
});

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('getBootstrapSrc', () => {
  it('should return live script when on live environment', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js',
    );
  });

  it('should return live legacy script when on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js',
    );
  });

  it('should return test script when not on live environment', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
    );
  });

  it('should return test legacy script when not on live environment and legacy is true', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('?invalid-query', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js',
    );
  });

  it('should return live script when not on live environment and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js',
    );
  });

  it('should return live legacy script when not on live environment and legacy is true and query string ads-js-env is set to live', () => {
    isLive.mockImplementationOnce(() => false);
    expect(getBootstrapSrc('ads-js-env=live', true)).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js',
    );
  });

  it('should return test script when on live environment and query string ads-test=true is set', () => {
    isLive.mockImplementationOnce(() => true);
    expect(getBootstrapSrc('ads-test=true')).toBe(
      'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
    );
  });
});
