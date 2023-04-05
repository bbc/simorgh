/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import isLive from '../../../lib/utilities/isLive';
import { render } from '../../react-testing-library-with-providers';
import CanonicalAd, { getBootstrapSrc } from '.';
import { SlotType } from '../types';

jest.mock('../../../lib/utilities/isLive');
const isLiveMock = isLive as jest.Mock;
interface CanonicalAdProps {
  slotType: SlotType;
}

const CanonicalAdWithRouter = ({ slotType }: CanonicalAdProps) => (
  <BrowserRouter>
    <CanonicalAd slotType={slotType} />
  </BrowserRouter>
);

describe('Canonical Ad', () => {
  beforeEach(() => {
    // @ts-ignore
    window.dotcom = {
      bootstrap: jest.fn(),
      cmd: { push: jest.fn() },
    };
  });

  afterEach(() => {
    // @ts-ignore
    window.dotcom = undefined;
  });

  describe('Assertions', () => {
    it('should return null when showAdsBasedOnLocation is false', () => {
      const { container } = render(
        <CanonicalAdWithRouter slotType="leaderboard" />,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Snapshots', () => {
    it('should correctly render an Canonical leaderboard ad with dotcom-bootstrap script', () => {
      const { container } = render(
        <CanonicalAdWithRouter slotType="leaderboard" />,
        { showAdsBasedOnLocation: true },
      );
      expect(container).toMatchSnapshot();
    });

    it('should correctly render a Canonical mpu ad with dotcom-bootstrap script', () => {
      const { container } = render(<CanonicalAdWithRouter slotType="mpu" />, {
        showAdsBasedOnLocation: true,
      });
      expect(container).toMatchSnapshot();
    });
  });

  describe('getBootstrapSrc', () => {
    it('should return live script when on live environment', () => {
      isLiveMock.mockImplementationOnce(() => true);
      expect(getBootstrapSrc('')).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js',
      );
    });

    it('should return live legacy script when on live environment and legacy is true', () => {
      isLiveMock.mockImplementationOnce(() => true);
      expect(getBootstrapSrc('', true)).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js',
      );
    });

    it('should return test script when not on live environment', () => {
      isLiveMock.mockImplementationOnce(() => false);
      expect(getBootstrapSrc('')).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
      );
    });

    it('should return test legacy script when not on live environment and legacy is true', () => {
      isLiveMock.mockImplementationOnce(() => false);
      expect(getBootstrapSrc('?invalid-query', true)).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap-legacy.js',
      );
    });

    it('should return live script when not on live environment and query string ads-js-env is set to live', () => {
      isLiveMock.mockImplementationOnce(() => false);
      expect(getBootstrapSrc('ads-js-env=live')).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap.js',
      );
    });

    it('should return live legacy script when not on live environment and legacy is true and query string ads-js-env is set to live', () => {
      isLiveMock.mockImplementationOnce(() => false);
      expect(getBootstrapSrc('ads-js-env=live', true)).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/dotcom-bootstrap-legacy.js',
      );
    });

    it('should return test script when on live environment and query string ads-test=true is set', () => {
      isLiveMock.mockImplementationOnce(() => true);
      expect(getBootstrapSrc('ads-test=true')).toBe(
        'https://gn-web-assets.api.bbc.com/ngas/latest/test/dotcom-bootstrap.js',
      );
    });
  });
});
