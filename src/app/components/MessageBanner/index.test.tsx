import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '../react-testing-library-with-providers';
import MessageBanner from '.';
import { kyrgyzMessageBannerOnePromo } from './fixtures';
import * as viewTracking from '../../hooks/useViewTracker';
import * as clickTracking from '../../hooks/useClickTrackerHandler';

describe('MessageBanner', () => {
  const summary = kyrgyzMessageBannerOnePromo.summaries[0];
  const eventTrackingData = { componentName: 'message-banner' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('for a curation with 1 summary', () => {
    it('should render a section with role region', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
    });

    it('should have a heading with an id which matches the aria-labelledby attribute', () => {
      const { getByRole } = render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      const heading = screen.getByText(kyrgyzMessageBannerOnePromo.title);
      const messageBannerEl = getByRole('region');
      expect(messageBannerEl.getAttribute('aria-labelledby')).toBe(
        heading.getAttribute('id'),
      );
    });

    it('should display the banner heading correctly as an H2', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      expect(screen.getByText(kyrgyzMessageBannerOnePromo.title).nodeName).toBe(
        'H2',
      );
    });

    it('should display the banner subtext correctly as a Paragraph', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      expect(screen.getByText(summary.description).nodeName).toBe('P');
    });

    it('should display link text correctly as an Anchor', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      const ctaLink = screen.getByRole('link');
      expect(ctaLink.getAttribute('href')).toEqual(summary.link);
      expect(ctaLink.textContent).toEqual(summary.title);
    });

    it('should render an image with the correct image src', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      const image = screen.getByAltText('');
      expect(image.getAttribute('src')).toEqual(
        'https://ichef.test.bbci.co.uk/ace/ws/240/cpsdevpb/66b8/test/d1be6bc0-8114-11ed-bd83-8f15ba358e41.png',
      );
    });

    it('should have an image with an empty alt text', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
    });
  });

  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should not be enabled if event tracking data not provided', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(undefined);
    });

    it('should register view tracker if event tracking data provided', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });
  });

  describe('click tracking', () => {
    const clickTrackerSpy = jest
      .spyOn(clickTracking, 'default')
      .mockImplementation();

    it('should not be enabled if event tracking data not provided', () => {
      const { container } = render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(undefined);

      const [callToActionLink] = container.getElementsByTagName('a');
      fireEvent.click(callToActionLink);
      expect(callToActionLink.onclick).toBeFalsy();
    });

    it('should register click tracker if event tracking data provided', () => {
      render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });

    it('should handle a click event when call to action link clicked', () => {
      clickTrackerSpy.mockRestore();

      const { container } = render(
        <MessageBanner
          heading={kyrgyzMessageBannerOnePromo.title}
          description={summary.description}
          link={summary.link}
          linkText={summary.title}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
        />,
      );

      const [callToActionLink] = container.getElementsByTagName('a');
      fireEvent.click(callToActionLink);

      expect(callToActionLink.onclick).toBeTruthy();
    });
  });
});
