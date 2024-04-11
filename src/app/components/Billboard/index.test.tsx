import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import Billboard from '.';
import { kyrgyzBillboard } from './fixtures';
import * as viewTracking from '../../hooks/useViewTracker';

describe('Billboard', () => {
  const summary = kyrgyzBillboard.summaries[0];
  const eventTrackingData = { componentName: 'billboard' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('for a curation with 1 summary', () => {
    it('should render a section with role region', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
    });

    it('should have a heading with an id which matches the aria-labelledby attribute', () => {
      const { getByRole } = render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      const heading = screen.getByText(kyrgyzBillboard.title);
      const messageBannerEl = getByRole('region');
      expect(messageBannerEl.getAttribute('aria-labelledby')).toBe(
        heading.getAttribute('id'),
      );
    });

    it('should display the banner heading correctly as an H2', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      expect(screen.getByText(kyrgyzBillboard.title).nodeName).toBe('H2');
    });

    it('should display the banner subtext correctly as a Paragraph', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      expect(screen.getByText(summary.description).nodeName).toBe('P');
    });

    it('should display link text correctly as an Anchor', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      const ctaLink = screen.getByRole('link');
      expect(ctaLink.getAttribute('href')).toEqual(summary.link);
      expect(ctaLink.textContent).toEqual(summary.title);
    });

    it('should render an masked image with the correct image src', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      const maksedImage = screen.getByAltText('');
      expect(maksedImage.getAttribute('src')).toEqual(
        summary.imageUrl.replace('{width}', 'raw'),
      );
    });

    it('should have an masked image with an empty alt text', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );
      const maksedImage = screen.getByAltText('');
      expect(maksedImage).toBeInTheDocument();
    });
  });

  describe('view tracking', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    it('should not be enabled if event tracking data not provided', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(undefined);
    });

    it('should register view tracker if event tracking data provided', () => {
      render(
        <Billboard
          heading={kyrgyzBillboard.title}
          description={summary.description}
          link={summary.link}
          image={summary.imageUrl}
          eventTrackingData={eventTrackingData}
          showLiveLabel
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith(eventTrackingData);
    });
  });
});
