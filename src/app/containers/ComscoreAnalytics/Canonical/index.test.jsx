import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import ContextWrap from '../testHelper';
import ComscoreAnalytics from '..';

describe('Canonical Comscore Analytics ', () => {
  const toggleState = {
    comscoreAnalytics: {
      enabled: true,
    },
  };

  describe('Assertions', () => {
    it('should render null when not on client', async () => {
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

    it('should render canonical comscore with noscript and script element', async () => {
      const noScriptContent = `<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cs_ucfr=0&cv=2.0&cj=1" />`;

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
        const noScriptEl = document.querySelector('noscript');
        expect(noScriptEl).toBeInTheDocument();
        expect(noScriptEl.textContent).toEqual(noScriptContent);

        const scriptEl = document.querySelector('script');
        expect(scriptEl).toBeInTheDocument();
        expect(scriptEl).toHaveAttribute('async');
        expect(scriptEl.src).toEqual(
          'http://localhost:7080/static/js/comscore-1.0.js',
        );
      });
    });
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should render comscore script when on canonical and toggle is enabled',
      <ContextWrap
        platform="canonical"
        pageType="article"
        origin="bbc.com"
        toggleState={toggleState}
      >
        <ComscoreAnalytics />
      </ContextWrap>,
    );
  });
});
