import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import MessageBanner from '.';
import kyrgyzBanner from './fixtures';

const { summaries } = kyrgyzBanner;

describe('MessageBanner', () => {
  it('should render a section with role region', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should display the banner title correctly as an H2', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(screen.getByText(kyrgyzBanner.title).nodeName).toBe('H2');
  });

  it('should display the banner subtext correctly as a Paragraph', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(screen.getByText(summaries[0].description).nodeName).toBe('P');
  });

  it('should display link text correctly as an Anchor', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(screen.getByRole('link').nodeName).toBe('A');
  });

  it('should have an empty imageAlt', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    const image = screen.getByAltText('');
    expect(image.getAttribute('alt')).toEqual('');
  });

  it('should have visual style of BANNER', () => {
    render(<MessageBanner summaries={summaries} title={kyrgyzBanner.title} />);
    expect(kyrgyzBanner.visualStyle).toBe('BANNER');
  });
});
