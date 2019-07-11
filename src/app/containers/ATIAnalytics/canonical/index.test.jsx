import React from 'react';
import { create, act } from 'react-test-renderer';
import { render } from 'enzyme';
import CanonicalATIAnalytics from '.';
import { shouldMatchSnapshot } from '../../../../testHelpers';
import * as atiUrl from '../atiUrl';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: jest.fn(),
  };
});

const { useContext } = jest.requireMock('react');

const contextToReturn = (
  bbcOrigin = 'https://logws1363.ati-host.net',
  env = 'test',
) => ({
  service: 'news',
  id: 'c0000000000o',
  isAmp: false,
  pageType: 'article',
  env,
  bbcOrigin,
});

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
    useContext.mockReset();
  });

  const mockPageviewParams = 'key=value&key2=value2';

  // following tests are commented out so can debug them one at a time
  const testCases = [
    {
      describe:
        'should call sendBeacon with Live ATI URL for live env (.co.uk)',
      env: 'live',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      bbcOrigin: 'https://www.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Live ATI URL for stage env (.co.uk)',
      env: 'live',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      bbcOrigin: 'https://www.stage.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Test ATI URL for test env (.co.uk)',
      env: 'test',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'https://www.test.bbc.co.uk',
    },
    {
      describe:
        'should call sendBeacon with Test ATI URL for local env (.co.uk)',
      env: 'local',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'http://localhost.bbc.co.uk',
    },
    {
      describe: 'should call sendBeacon with Live ATI URL for live env (.com)',
      env: 'live',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      bbcOrigin: 'https://www.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Live ATI URL for stage env (.com)',
      env: 'live',
      atiBaseUrl: 'https://a1.api.bbc.co.uk/hit.xiti?',
      bbcOrigin: 'https://www.stage.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Test ATI URL for test env (.com)',
      env: 'test',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'https://www.test.bbc.com',
    },
    {
      describe: 'should call sendBeacon with Test ATI URL for local env (.com)',
      env: 'local',
      atiBaseUrl: 'https://logws1363.ati-host.net?',
      bbcOrigin: 'http://localhost.bbc.com',
    },
  ];

  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');

  testCases.forEach(({ describe, env, atiBaseUrl, bbcOrigin }) => {
    it(describe, () => {
      const mockAtiBaseUrl = jest.fn().mockReturnValue(atiBaseUrl);
      const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;

      useContext.mockReturnValue(contextToReturn(bbcOrigin, env));

      atiUrl.atiBaseUrl = mockAtiBaseUrl;
      beacon.default = mockSendBeacon;

      act(() => {
        create(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
      });

      expect(mockAtiBaseUrl).toHaveBeenCalledWith(env);
      expect(mockSendBeacon).toHaveBeenCalledTimes(1);
      expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl);
    });
  });

  it('should render a noscript image for non-JS users', () => {
    useContext.mockReturnValue(contextToReturn());

    const renderedATI = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );

    expect(renderedATI.html()).toBe(
      `<img height="1px" width="1px" alt="" src="https://logws1363.ati-host.net?key=value&amp;key2=value2"/>`,
    );
  });

  describe('snapshots', () => {
    beforeEach(() => {
      useContext.mockReturnValue(
        contextToReturn('https://www.bbc.co.uk', 'live'),
      );
    });

    shouldMatchSnapshot(
      'should render correctly',
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );
  });
});
