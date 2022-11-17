import React from 'react';
import { render, act } from '@testing-library/react';
import * as beacon from '#lib/analyticsUtils/sendBeacon';
import CanonicalATIAnalytics from '.';

const beaconSpy = jest.spyOn(beacon, 'default');

describe('Canonical ATI Analytics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const atiBaseUrl = 'https://foobar.com?';
  const mockPageviewParams = 'key=value&key2=value2&x8=[simorgh]';
  const mockSendBeacon = beaconSpy.mockReturnValue('beacon-return-value');

  it('calls atiBaseURL and sendBeacon with required params', () => {
    const expectedUrl = `${atiBaseUrl}${mockPageviewParams}`;

    process.env.SIMORGH_ATI_BASE_URL = atiBaseUrl;

    act(() => {
      render(<CanonicalATIAnalytics pageviewParams={mockPageviewParams} />);
    });

    expect(mockSendBeacon).toHaveBeenCalledTimes(1);
    expect(mockSendBeacon).toHaveBeenCalledWith(expectedUrl);
  });

  it('should render a noscript image for non-JS users', () => {
    const { container } = render(
      <CanonicalATIAnalytics pageviewParams={mockPageviewParams} />,
    );
    expect(container.querySelector('noscript')).toBeInTheDocument();
  });
});
