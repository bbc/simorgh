import React from 'react';
import { oneOf, node } from 'prop-types';
import renderer from 'react-test-renderer';
import CanonicalATIAnalytics from '.';

import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';

const ContextWrap = ({ env, children }) => (
  <ServiceContextProvider service="news">
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
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

ContextWrap.propTypes = {
  env: oneOf(['local', 'test', 'live']).isRequired,
  children: node.isRequired,
};

const mockPageviewParams = 'key=value&key2=value2';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot(
    'should render correctly for Live ATI endpoint',
    <ContextWrap env="live">
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
    </ContextWrap>,
  );

  const testCases = [
    {
      describe: 'should call sendBeacon with Live ATI URL for live env',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      env: 'live',
    },
    // {
    //   describe: 'should call sendBeacon with Test ATI URL for test env',
    //   atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
    //   env: 'test',
    // },
    // {
    //   describe: 'should call sendBeacon with Test ATI URL for local env',
    //   atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
    //   env: 'local',
    // },
  ];

  testCases.forEach(({ describe, atiUrl, env }) => {
    it(describe, () => {
      const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
      beacon.default = mockSendBeacon;

      renderer.create(
        <ContextWrap env={env}>
          <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
        </ContextWrap>,
      );

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon).toHaveBeenCalledWith(atiUrl);
    });
  });
});
