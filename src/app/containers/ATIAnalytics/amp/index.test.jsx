import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import AmpATIAnalytics from '.';
import { RequestContextProvider } from '../../../contexts/RequestContext';

describe('Amp ATI Analytics', () => {
  let container;
  beforeEach(() => {
    jest.resetModules();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  const testCases = [
    {
      describe:
        'should render amp-analytics with script tag & contain live ATI url - live env',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      env: 'live',
    },
    {
      describe:
        'should render amp-analytics with script tag & contain test ATI url - test env',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      env: 'test',
    },
    {
      describe:
        'should render amp-analytics with script tag & contain test ATI url - local env',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      env: 'local',
    },
  ];

  testCases.forEach(({ describe, atiBaseUrl, env }) => {
    it(describe, () => {
      act(() => {
        ReactDOM.render(
          <RequestContextProvider
            env={env}
            isUK
            platform="canonical"
            origin="https://www.test.bbc.co.uk"
            pageType="article"
            service="news"
            statsDestination="NEWS_PS_TEST"
            statsPageIdentifier="news.articles.c0000000000o.page"
          >
            <AmpATIAnalytics pageviewParams="key1=value1&key2=value2" />
          </RequestContextProvider>,
          container,
        );
      });

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
