import React from 'react';
import { node, string } from 'prop-types';
import TestRenderer from 'react-test-renderer';
import ReactDOM from 'react-dom';
import CanonicalATIAnalytics from '.';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '../../../contexts/RequestContext';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';

const { act } = TestRenderer;

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

describe('Canonical ATI Analytics', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.clearAllMocks();
  });
  const mockPageviewParams = 'key=value&key2=value2';

  // following tests are commented out so can debug them one at a time
  const testCases = [
    {
      describe:
        'should call sendBeacon with Live ATI URL for live env (.co.uk)',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      bbcOrigin: 'https://www.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Live ATI URL for stage env (.co.uk)',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      bbcOrigin: 'https://www.stage.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Test ATI URL for test env (.co.uk)',
      atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
      bbcOrigin: 'https://www.test.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Test ATI URL for local env (.co.uk)',
      atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
      bbcOrigin: 'http://localhost.bbc.co.uk',
    },
    {
      describe: 'should call sendBeacon with Live ATI URL for live env (.com)',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      bbcOrigin: 'https://www.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Live ATI URL for stage env (.com)',
      atiUrl: 'https://a1.api.bbc.co.uk/hit.xiti?key=value&key2=value2',
      bbcOrigin: 'https://www.stage.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Test ATI URL for test env (.com)',
      atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
      bbcOrigin: 'https://www.test.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Test ATI URL for local env (.com)',
      atiUrl: 'https://logws1363.ati-host.net?key=value&key2=value2',
      bbcOrigin: 'http://localhost.bbc.com',
    },
  ];

  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');

  testCases.forEach(({ describe, atiUrl, bbcOrigin }) => {
    it(describe, () => {
      beacon.default = mockSendBeacon;

      act(() => {
        TestRenderer.create(
          <ContextWrap bbcOrigin={bbcOrigin}>
            <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
          </ContextWrap>,
        );
      });

      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon).toHaveBeenCalledWith(atiUrl);
    });
  });

  it('should render a noscript image for non-JS users', () => {
    act(() => {
      ReactDOM.render(
        <ContextWrap bbcOrigin="http://localhost.bbc.com">
          <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
        </ContextWrap>,
        container,
      );

      expect(container.innerHTML).toBe(
        `<noscript><img height="1px" width="1px" alt="" src="https://logws1363.ati-host.net?key=value&key2=value2" /></noscript>`,
      );
    });
  });

  shouldMatchSnapshot(
    'should render correctly',
    <ContextWrap bbcOrigin="https://www.bbc.co.uk">
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />
    </ContextWrap>,
  );
});
