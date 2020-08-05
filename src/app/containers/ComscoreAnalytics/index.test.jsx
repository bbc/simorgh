import React from 'react';
import { render } from '@testing-library/react';
import ContextWrap from './utilities/testHelper';
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

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe('Assertions - Canonical', () => {
    it('should return null when toggle is disabled', async () => {
      const toggleState = {
        comscoreAnalytics: {
          enabled: false,
        },
      };
      const { container } = render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );

      expect(container).toBeEmptyDOMElement();
    });
  });
});
