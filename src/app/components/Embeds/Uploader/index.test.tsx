import React from 'react';
import { render, screen } from '#components/react-testing-library-with-providers';
import Uploader from '.';
import {
  uploader,
  uploaderWithIncorrectType,
  missingAresUploader,
} from './fixtures';

describe('Uploader', () => {
  it('should render a section with role region', () => {
    render(<Uploader blocks={uploader} />);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it('should have a title with an id which matches the aria-labelledby attribute', () => {
    const { getByRole } = render(<Uploader blocks={uploader} />);
    const title = screen.getByText('Get involved');
    const embedEl = getByRole('region');
    expect(embedEl.getAttribute('aria-labelledby')).toBe(
      title.getAttribute('id'),
    );
  });

  it('should display the title correctly as a Strong element', () => {
    render(<Uploader blocks={uploader} />);
    expect(screen.getByText('Get involved').nodeName).toBe('STRONG');
  });

  it('should display the text correctly as a Paragraph', () => {
    render(<Uploader blocks={uploader} />);
    expect(screen.getByText('UGC Core Features 1 - Custom Form').nodeName).toBe(
      'P',
    );
  });

  it('should render a link with the correct link text', () => {
    render(<Uploader blocks={uploader} />);
    const ctaLink = screen.getByRole('link');
    expect(ctaLink.textContent).toEqual('Send form');
  });

  it('should render a link with the correct href', () => {
    render(<Uploader blocks={uploader} />);
    const ctaLink = screen.getByRole('link');
    expect(ctaLink.getAttribute('href')).toEqual(
      'https://www.bbc.com/send/u94753086',
    );
  });

  it('Should return null when Ares has failed to add an aresUploader block', () => {
    const { container } = render(<Uploader blocks={missingAresUploader} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('Should return null when type is not aresUploader', () => {
    const { container } = render(
      <Uploader blocks={uploaderWithIncorrectType} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
