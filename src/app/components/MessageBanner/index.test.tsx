import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import MessageBanner from '.';
import kyrgyzBanner from './fixtures';

const { summaries } = kyrgyzBanner;
const [summary] = summaries;

describe('MessageBanner', () => {
  it('should render a section with role region', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a heading with an id which matches the aria-labelledby attribute', () => {
    const { getByRole } = render(
      <MessageBanner summaries={summaries} title={kyrgyzBanner.title} />,
    );
    const heading = screen.getByText(kyrgyzBanner.title);
    const messageBannerEl = getByRole('region');
    expect(messageBannerEl.getAttribute('aria-labelledby')).toBe(
      heading.getAttribute('id'),
    );
  });

  it('should display the banner title correctly as an H2', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(screen.getByText(kyrgyzBanner.title).nodeName).toBe('H2');
  });

  it('should display the banner subtext correctly as a Paragraph', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(screen.getByText(summary.description).nodeName).toBe('P');
  });

  it('should display link text correctly as an Anchor', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const ctaLink = screen.getByRole('link');
    expect(ctaLink.getAttribute('href')).toEqual(summary.link);
    expect(ctaLink.textContent).toEqual(summary.title);
  });

  it('should render an image with the correct image src', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const image = screen.getByAltText('');
    expect(image.getAttribute('src')).toEqual(
      summary.imageUrl.replace('{width}', 'raw'),
    );
  });

  it('should have an image with an empty alt text', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const image = screen.getByAltText('');
    expect(image).toBeInTheDocument();
  });
});
