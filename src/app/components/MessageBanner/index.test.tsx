import React from 'react';
import isLive from '#lib/utilities/isLive';
import { render, screen } from '../react-testing-library-with-providers';
import MessageBanner from '.';
import { kyrgyzMessageBannerOnePromo } from './fixtures';

describe('MessageBanner', () => {
  describe('for a curation with 1 summary', () => {
    const summary = kyrgyzMessageBannerOnePromo.summaries[0];
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
        summary.imageUrl.replace('{width}', 'raw'),
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
    describe('Presence on live environment', () => {
      it('should not render banner when SIMORGH_APP_ENV is live and isLive is set to render null', () => {
        process.env.SIMORGH_APP_ENV = 'live';

        // if islive is true, show banner
        render(
          <MessageBanner
            heading={kyrgyzMessageBannerOnePromo.title}
            description={summary.description}
            link={summary.link}
            linkText={summary.title}
            image={summary.imageUrl}
          />,
        );
        expect(
          document.querySelectorAll("[id^='message-banner']"),
        ).toHaveLength(0);
        expect(isLive()).toBe(true);
      });

      it('should render banner when SIMORGH_APP_ENV is not live', () => {
        process.env.SIMORGH_APP_ENV = 'non-live';
        render(
          <MessageBanner
            heading={kyrgyzMessageBannerOnePromo.title}
            description={summary.description}
            link={summary.link}
            linkText={summary.title}
            image={summary.imageUrl}
          />,
        );
        expect(
          document.querySelectorAll("[id^='message-banner']"),
        ).toHaveLength(1);
        // if isLive is false do not show banner
        expect(isLive()).toBe(false);
      });

      afterAll(() => {
        delete process.env.SIMORGH_APP_ENV;
      });
    });
  });
});
