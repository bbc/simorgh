import React from 'react';
import { Helmet } from 'react-helmet';
import {
  render,
  act,
} from '#app/components/react-testing-library-with-providers';
import * as isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { addSendStaticBeaconToWindow } from '#app/lib/analyticsUtils/staticATITracking/sendStaticBeacon';
import processClientDeviceAndSendStaticBeacon from '#app/lib/analyticsUtils/staticATITracking/processClientDeviceAndSendStaticBeacon';
import * as beacon from '../../../lib/analyticsUtils/sendBeacon';
import CanonicalATIAnalytics from '.';

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2&x8=[simorgh]';

  const mockSendBeacon = jest.fn().mockReturnValue('beacon-return-value');
  process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;
  // @ts-expect-error - we need to mock these functions to ensure tests are deterministic
  beacon.default = mockSendBeacon;

  it('calls atiBaseURL and sendBeacon with required params', () => {
    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;
    const reverbConfig = undefined;

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl, reverbConfig);
  });

  it('should add scripts to helmet', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags).toHaveLength(2);
  });

  it('should render sendStaticBeacon Helmet script', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    const helmet = Helmet.peek();

    expect(helmet.scriptTags[0].innerHTML).toEqual(
      addSendStaticBeaconToWindow(),
    );
  });

  it('should contain a beacon onLoad script via processClientDeviceAndSendStaticBeacon on lite', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => false);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />, {
        isLite: true,
      });
    });

    const helmet = Helmet.peek();
    const sendPageViewBeaconLite = helmet.scriptTags[1].innerHTML;

    expect(sendPageViewBeaconLite).toContain(
      processClientDeviceAndSendStaticBeacon.toString(),
    );
    expect(sendPageViewBeaconLite).toContain(
      `${atiBaseUrl}${mockPageviewParams}`,
    );
  });

  it('should not send beacon when browser is Opera Mini', () => {
    jest.spyOn(isOperaProxy, 'default').mockImplementation(() => true);

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).not.toHaveBeenCalled();
  });

  it('should render a noscript image for non-JS users', () => {
    const { container } = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });
});
