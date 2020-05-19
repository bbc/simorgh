import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import CanonicalAd from './index';

describe('CanonicalAds Ads', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an Canonical leaderboard ad with dotcom-bootstrap script',
      <CanonicalAd service="pidgin" />,
    );
  });

  describe('Assertions', () => {
    const bootstrap = jest.fn();

    beforeEach(() => {
      bootstrap.mockClear();
      window.dotcom = {
        bootstrap,
        // Used in AdSlot so this is tested there
        cmd: { push: jest.fn() },
      };
    });

    afterEach(() => {
      window.dotcom = undefined;
    });

    it('should call dotcom bootstrap to enable pageAds and disable playerAds', () => {
      act(() => {
        const container = document.createElement('div');
        ReactDOM.render(<CanonicalAd />, container);
      });

      expect(bootstrap).toHaveBeenCalledTimes(1);
      expect(bootstrap).toHaveBeenCalledWith({
        pageAds: true,
        playerAds: false,
      });
    });
  });
});
