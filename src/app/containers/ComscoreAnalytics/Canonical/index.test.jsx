import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import onClient from '#lib/utilities/onClient';
import ContextWrap from '../utilities';
import ComscoreAnalytics from '..';

jest.mock('#lib/utilities/onClient');

const excptedNoScriptContent = personalisationEnabled => {
  const csUcfr = personalisationEnabled ? '1' : '0';
  return `<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cs_ucfr=${csUcfr}&cv=2.0&cj=1" />`;
};

describe('Canonical Comscore Analytics ', () => {
  const toggleState = {
    comscoreAnalytics: {
      enabled: true,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    onClient.mockReturnValue(true);
  });

  describe('Assertions', () => {
    it('should render null when not on client', async () => {
      onClient.mockReturnValue(false);
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

    it('should render the noscript with cs_ucfr=0', async () => {
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
        expect(noScriptEl.textContent).toEqual(excptedNoScriptContent(false));
      });
    });

    it('should render the noscript with cs_ucfr=1', async () => {
      const personalisation = { personalisationEnabled: true };
      render(
        <ContextWrap
          platform="canonical"
          pageType="article"
          origin="bbc.com"
          toggleState={toggleState}
          personalisation={personalisation}
        >
          <ComscoreAnalytics />
        </ContextWrap>,
      );
      await waitFor(() => {
        const noScriptEl = document.querySelector('noscript');
        expect(noScriptEl).toBeInTheDocument();
        expect(noScriptEl.textContent).toEqual(excptedNoScriptContent(true));
      });
    });

    it('should render the canonical comscore script from self-hosted src', async () => {
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
        expect(scriptEl).toBeInTheDocument();
        expect(scriptEl).toHaveAttribute('async');
        expect(scriptEl.src).toEqual(
          'http://localhost:7080/static/js/comscore.js',
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
