import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpATIAnalytics from '.';
import * as atiUrl from '../atiUrl';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

const contextToReturn = (bbcOrigin, env) => ({
  service: 'news',
  id: 'c0000000000o',
  isAmp: true,
  pageType: 'article',
  env,
  bbcOrigin,
});

describe('Amp ATI Analytics', () => {
  let container;
  beforeEach(() => {
    jest.resetModules();
    useContext.mockReset();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  const testCases = [
    {
      describe:
        'should render amp-analytics with script tag & contain live ATI url - live env',
      env: 'live',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      bbcOrigin: 'https://www.bbc.co.uk',
    },
    {
      describe:
        'should render amp-analytics with script tag & contain test ATI url - test env',
      env: 'test',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'https://www.test.bbc.co.uk',
    },
    {
      describe:
        'should render amp-analytics with script tag & contain test ATI url - local env',
      env: 'local',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'http://localhost.bbc.co.uk',
    },
  ];

  testCases.forEach(({ describe, env, atiBaseUrl, bbcOrigin }) => {
    it(describe, () => {
      const mockAtiBaseUrl = jest.fn().mockReturnValue(atiBaseUrl);

      useContext.mockReturnValue(contextToReturn(bbcOrigin, env));
      atiUrl.atiBaseUrl = mockAtiBaseUrl;

      act(() => {
        ReactDOM.render(
          <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />,
          container,
        );
      });

      expect(mockAtiBaseUrl).toHaveBeenCalledWith(env);
      expect(container.querySelectorAll('amp-analytics').length).toEqual(1);
      expect(
        container.querySelectorAll(
          'amp-analytics script[type="application/json"]',
        ).length,
      ).toEqual(1);
      expect(
        container.querySelector('amp-analytics script[type="application/json"]')
          .innerHTML,
      ).toMatch(atiBaseUrl);
    });
  });
});
