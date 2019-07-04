import React from 'react';
import { node, string } from 'prop-types';
import renderer from 'react-test-renderer';
import CanonicalATIAnalytics from '.';

import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';

const ContextWrap = ({ bbcOrigin, children }) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin={bbcOrigin}
      id="c0000000000o"
      isAmp={false}
      pageType="article"
      service="news"
    >
      {children}
    </RequestContextProvider>
  </ServiceContextProvider>
);

ContextWrap.propTypes = {
  bbcOrigin: string.isRequired,
  children: node.isRequired,
};

const mockPageviewParams = 'key=value&key2=value2';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  shouldMatchSnapshot(
    'should render correctly for Live ATI endpoint',
    <ContextWrap bbcOrigin="https://www.bbc.co.uk">
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
    </ContextWrap>,
  );

  const testCases = [
    {
      describe: 'should call sendBeacon with Live ATI URL for live env',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      bbcOrigin: 'https://www.bbc.co.uk',
    },
    // {
    //   describe: 'should call sendBeacon with Test ATI URL for test env',
    //   atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
    //   bbcOrigin: 'https://www.test.bbc.co.uk',
    // },
    // {
    //   describe: 'should call sendBeacon with Test ATI URL for local env',
    //   atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
    //   bbcOrigin: 'http://localhost.bbc.co.uk',
    // },
  ];

  testCases.forEach(({ describe, atiUrl, bbcOrigin }) => {
    it(describe, () => {
      const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
      beacon.default = mockSendBeacon;

      renderer.create(
        <ContextWrap bbcOrigin={bbcOrigin}>
          <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
        </ContextWrap>,
      );

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon).toHaveBeenCalledWith(atiUrl);
    });
  });
});
