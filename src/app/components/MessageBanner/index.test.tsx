import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import MessageBanner from '.';
import {
  kyrgyzMessageBannerOnePromo,
  kyrgyzMessageBannerTwoPromos,
} from './fixtures';

describe('MessageBanner', () => {
  describe('One summary', () => {
    const { summaries } = kyrgyzMessageBannerOnePromo;
    const summary = summaries[0];
    it('should render a section with role region', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      const region = screen.getByRole('region');
      expect(region).toBeInTheDocument();
    });

    it('should have a heading with an id which matches the aria-labelledby attribute', () => {
      const { getByRole } = render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      const heading = screen.getByText(kyrgyzMessageBannerOnePromo.title);
      const messageBannerEl = getByRole('region');
      expect(messageBannerEl.getAttribute('aria-labelledby')).toBe(
        heading.getAttribute('id'),
      );
    });

    it('should display the banner title correctly as an H2', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      expect(screen.getByText(kyrgyzMessageBannerOnePromo.title).nodeName).toBe(
        'H2',
      );
    });

    it('should display the banner subtext correctly as a Paragraph', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      expect(screen.getByText(summary.description).nodeName).toBe('P');
    });

    it('should display link text correctly as an Anchor', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      const ctaLink = screen.getByRole('link');
      expect(ctaLink.getAttribute('href')).toEqual(summary.link);
      expect(ctaLink.textContent).toEqual(summary.title);
    });

    it('should render an image with the correct image src', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      const image = screen.getByAltText('');
      expect(image.getAttribute('src')).toEqual(
        summary.imageUrl.replace('{width}', 'raw'),
      );
    });

    it('should have an image with an empty alt text', () => {
      render(
        <MessageBanner
          summary={summary}
          title={kyrgyzMessageBannerOnePromo.title}
          position={kyrgyzMessageBannerOnePromo.position}
        />,
      );
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
    });
  });
  describe('Two summaries', () => {
    const { summaries } = kyrgyzMessageBannerTwoPromos;
    it('should only render one banner per curation', () => {
      render(
        <MessageBanner
          summary={summaries[0]}
          title={kyrgyzMessageBannerTwoPromos.title}
          position={kyrgyzMessageBannerTwoPromos.position}
        />,
      );

      expect(document.querySelectorAll("[id='message-banner-6']")).toHaveLength(
        1,
      );
    });
  });
});
