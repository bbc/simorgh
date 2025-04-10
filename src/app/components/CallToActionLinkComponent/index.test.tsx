import React from 'react';
import * as clickTracking from '#app/hooks/useClickTrackerHandler';
import { render, screen } from '../react-testing-library-with-providers';
import CallToActionLink from '.';

describe('Call To Action Link', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render child elements', () => {
    const { container } = render(
      <CallToActionLink to="https://www.bbc.com/ws/languages">
        <CallToActionLink.FlexWrapper>
          <CallToActionLink.Text size="brevier" fontVariant="sansBold">
            My Link Text
          </CallToActionLink.Text>
          <CallToActionLink.Chevron />
        </CallToActionLink.FlexWrapper>
      </CallToActionLink>,
    );
    const link = screen.getByText('My Link Text');
    const [chevron] = container.getElementsByTagName('svg');
    expect(link).toBeInTheDocument();
    expect(chevron).toBeInTheDocument();
  });

  it('should render a link with the correct href', () => {
    render(
      <CallToActionLink to="https://www.bbc.com/ws/languages">
        <CallToActionLink.Text size="brevier" fontVariant="sansBold">
          My Link Text
        </CallToActionLink.Text>
      </CallToActionLink>,
    );
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toEqual(
      'https://www.bbc.com/ws/languages',
    );
  });

  it('should register click tracker if event tracking data provided', () => {
    const eventTrackingData = { componentName: 'call-to-action-link' };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(
      <CallToActionLink
        to="https://www.bbc.com/ws/languages"
        eventTrackingData={eventTrackingData}
      >
        <CallToActionLink.Text size="brevier" fontVariant="sansBold">
          My Link Text
          <CallToActionLink.Chevron />
        </CallToActionLink.Text>
      </CallToActionLink>,
    );

    expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
  });

  it(`Should permit custom attributes through html attributes`, () => {
    render(
      <CallToActionLink
        to="https://www.bbc.com/ws/languages"
        {...{ 'data-ignore-lite': true }}
      >
        <CallToActionLink.Text size="brevier" fontVariant="sansBold">
          My Link Text
        </CallToActionLink.Text>
        <CallToActionLink.Chevron />
      </CallToActionLink>,
    );

    const link = screen.getByRole('link');
    expect(link.getAttribute('data-ignore-lite')).toBeTruthy();
  });
});
