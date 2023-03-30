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
      const originalEnvironment = process.env.SIMORGH_APP_ENV;

      afterEach(() => {
        process.env.SIMORGH_APP_ENV = originalEnvironment;
      });
      it('should render banner when the environment is live', () => {
        process.env.SIMORGH_APP_ENV = 'live';

        // if isLive is true, show banner
        const { container } = render(
          <MessageBanner
            heading={kyrgyzMessageBannerOnePromo.title}
            description={summary.description}
            link={summary.link}
            linkText={summary.title}
            image={summary.imageUrl}
          />,
        );
        expect(container).not.toBeEmptyDOMElement();
        expect(isLive()).toBe(true);
      });

      it('should render banner when the environment is not live', () => {
        process.env.SIMORGH_APP_ENV = 'non-live';
        // if isLive is false do show banner
        const { container } = render(
          <MessageBanner
            heading={kyrgyzMessageBannerOnePromo.title}
            description={summary.description}
            link={summary.link}
            linkText={summary.title}
            image={summary.imageUrl}
          />,
        );
        expect(container).not.toBeEmptyDOMElement();
        expect(isLive()).toBe(false);
      });
    });
  });
});
