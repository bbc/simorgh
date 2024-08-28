import React from 'react';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { render, screen } from '#components/react-testing-library-with-providers';
import CallToActionLink from '.';

describe('Call To Action Link', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children as link text', () => {
    render(
      <CallToActionLink href="https://www.bbc.com/send/u94753086">
        My Link Text
      </CallToActionLink>,
    );
    const link = screen.getByText('My Link Text');
    expect(link).toBeInTheDocument();
  });

  it('should render a link with the correct href', () => {
    render(
      <CallToActionLink href="https://www.bbc.com/send/u94753086">
        My Link Text
      </CallToActionLink>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toEqual(
      'https://www.bbc.com/send/u94753086',
    );
  });

  it('should register click tracker if event tracking data provided', () => {
    const eventTrackingData = { componentName: 'call-to-action-link' };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(
      <CallToActionLink
        href="https://www.bbc.com/send/u94753086"
        eventTrackingData={eventTrackingData}
      >
        My Link Text
      </CallToActionLink>,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });
});
