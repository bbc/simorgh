import React from 'react';
import { act, render, waitFor } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { UserContext } from '#contexts/UserContext';
import CanonicalComscore from '.';

describe('Canonical Comscore Analytics ', () => {
  beforeEach(() => {
    /* eslint-disable no-underscore-dangle */
    window._comscore = [];
  });

  describe('Assertions', () => {
    it('should render null when not on client', async () => {
      const { container } = render(
        <UserContext.Provider value={{ personalisationEnabled: false }}>
          <CanonicalComscore />
        </UserContext.Provider>,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should render canonical comscore with noscript and script element', async () => {
      const noScriptContent = `<img src="https://sb.scorecardresearch.com/p?c1=2&c2=17986528&cs_ucfr=0&cv=2.0&cj=1" />`;

      render(
        <UserContext.Provider value={{ personalisationEnabled: false }}>
          <CanonicalComscore />
        </UserContext.Provider>,
      );
      await waitFor(() => {
        const noScriptEl = document.querySelector('noscript');
        expect(noScriptEl).toBeInTheDocument();
        expect(noScriptEl.textContent).toEqual(noScriptContent);

        const scriptEl = document.querySelector('script');
        expect(scriptEl).toBeInTheDocument();
        expect(scriptEl).toHaveAttribute('async');
        expect(scriptEl.src).toEqual(
          'http://localhost:7080/static/js/comscore/main-1.0.js',
        );
      });
    });

    it('should create window._comscore without personalisation', async () => {
      await act(async () => {
        render(
          <UserContext.Provider value={{ personalisationEnabled: false }}>
            <CanonicalComscore />
          </UserContext.Provider>,
        );
      });

      expect(window._comscore).toEqual([
        { c1: '2', c2: '17986528', cs_ucfr: '0' },
      ]);
    });

    it('should create window._comscore with personalisation', async () => {
      await act(async () => {
        render(
          <UserContext.Provider value={{ personalisationEnabled: true }}>
            <CanonicalComscore />
          </UserContext.Provider>,
        );
      });

      expect(window._comscore).toEqual([
        { c1: '2', c2: '17986528', cs_ucfr: '1' },
      ]);
    });
  });

  describe('Snapshots', () => {
    shouldMatchSnapshot(
      'should render comscore script when on canonical',
      <UserContext.Provider value={{ personalisationEnabled: false }}>
        <CanonicalComscore />
      </UserContext.Provider>,
    );
  });
});
