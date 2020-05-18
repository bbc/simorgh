import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import '@testing-library/jest-dom/extend-expect';
import AdSlot from './AdSlot';

describe('CanonicalAds Ads', () => {
  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should correctly render an AdSlot with leaderboard id',
      <BrowserRouter>
        <AdSlot type="leaderboard" />
      </BrowserRouter>,
    );
  });

  describe('Assertions', () => {
    const push = jest.fn();

    beforeEach(() => {
      push.mockClear();
      window.dotcom = {
        // Used in index.jsx so this is tested there
        bootstrap: jest.fn(),
        cmd: { push },
      };
    });

    afterEach(() => {
      window.dotcom = undefined;
    });

    it('should call dotcom cmd.push with ad registration', () => {
      act(() => {
        const container = document.createElement('div');
        ReactDOM.render(
          <BrowserRouter>
            <AdSlot type="leaderboard" />
          </BrowserRouter>,
          container,
        );
      });

      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
