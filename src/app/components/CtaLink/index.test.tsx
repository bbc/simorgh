import React from 'react';
import { render, screen } from '../react-testing-library-with-providers';
import CtaLink from '.';

describe('CTA Link', () => {
  it('should render children as link text', () => {
    render(
      <CtaLink href="https://www.bbc.com/send/u94753086">My Link Text</CtaLink>,
    );
    const link = screen.getByText('My Link Text');
    expect(link).toBeInTheDocument();
  });

  it('should render a link with the correct href', () => {
    render(
      <CtaLink href="https://www.bbc.com/send/u94753086">My Link Text</CtaLink>,
    );
    const ctaLink = screen.getByRole('link');
    expect(ctaLink.getAttribute('href')).toEqual(
      'https://www.bbc.com/send/u94753086',
    );
  });
});
