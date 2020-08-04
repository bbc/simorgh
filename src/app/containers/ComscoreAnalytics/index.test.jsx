import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ContextWrap from './utilities';
import ComscoreAnalytics from '.';

describe('Comscore Analytics Container', () => {
  describe('Assertions - AMP', () => {
    it('should return null when toggle is disabled', () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: false,
        },
      };
      const { container } = render(
        <ContextWrap
          platform="amp"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container.firstChild).toBeNull();
    });
  });

  describe('Assertions - Canonical', () => {
    it('should return null when toggle is disabled', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: false,
        },
      };
      render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      await waitFor(() => {
        const scriptEl = document.querySelector('script');
        const noscriptEl = document.querySelector('noscript');

        expect(scriptEl).toBeNull();
        expect(noscriptEl).toBeNull();
      });
    });
  });
});
