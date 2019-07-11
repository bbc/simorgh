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

const contextToReturn = {
  service: 'news',
  id: 'c0000000000o',
  isAmp: false,
  pageType: 'article',
  env: 'live',
  bbcOrigin: 'https://www.bbc.co.uk',
};

describe('Canonical ATI Analytics', () => {
  beforeEach(() => {
    useContext.mockReturnValue(contextToReturn);
  });

  afterEach(() => {
    jest.clearAllMocks();
    useContext.mockReset();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2';
  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
  const mockAtiBaseUrl = jest.fn().mockReturnValue(atiBaseUrl);

  it('calls atiBaseURL and sendBeacon with required params', () => {
    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;

    atiUrl.atiBaseUrl = mockAtiBaseUrl;
    beacon.default = mockSendBeacon;

    act(() => {
      create(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockAtiBaseUrl).toHaveBeenCalledWith('live');
    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl);
  });

  it('should render a noscript image for non-JS users', () => {
    const renderedATI = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );

    expect(renderedATI.html()).toBe(
      `<img height="1px" width="1px" alt="" src="https://foobar.com?key=value&amp;key2=value2"/>`,
    );
  });

  shouldMatchSnapshot(
    'should render correctly',
    <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
  );
});
