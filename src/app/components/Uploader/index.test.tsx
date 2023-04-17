import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import Uploader from '.';
import {
  pidginUploaderEmbed,
  uploaderEmbedWithIncorrectType,
} from './fixtures';

describe('Uploader', () => {
  it('should render a section with role region', () => {
    render(<Uploader blocks={pidginUploaderEmbed} />);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a title with an id which matches the aria-labelledby attribute', () => {
    const { getByRole } = render(<Uploader blocks={pidginUploaderEmbed} />);
    const title = screen.getByText('Get involved');
    const embedEl = getByRole('region');
    expect(embedEl.getAttribute('aria-labelledby')).toBe(
      title.getAttribute('id'),
    );
  });

  it('should display the title correctly as an H2', () => {
    render(<Uploader blocks={pidginUploaderEmbed} />);
    expect(screen.getByText('Get involved').nodeName).toBe('H2');
  });

  it('should display the text correctly as a Paragraph', () => {
    render(<Uploader blocks={pidginUploaderEmbed} />);
    expect(screen.getByText('UGC Core Features 1 - Custom Form').nodeName).toBe(
      'P',
    );
  });

  it('should display link text correctly as an Anchor', () => {
    render(<Uploader blocks={pidginUploaderEmbed} />);
    const ctaLink = screen.getByRole('link');
    expect(ctaLink.getAttribute('href')).toEqual(
      'https://www.bbc.com/send/u94753086',
    );
    expect(ctaLink.textContent).toEqual('Send form');
  });

  it('Should return null when type is not aresUploader', () => {
    const { container } = render(
      <Uploader blocks={uploaderEmbedWithIncorrectType} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
