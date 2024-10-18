import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiteSiteCta from '.';

describe('LiteSiteCTA', () => {
  it('Should have a strong element with page identifier.', () => {
    const { container } = render(<LiteSiteCta />);
    const strongText = container.querySelector('strong');
    expect(strongText?.innerHTML).toBe('Data saving version');
  });
  it('Should have a CTA link to the main site.', () => {
    const { container } = render(<LiteSiteCta />);
    const ctaText = container.querySelectorAll('a span')[0];
    const ctaLink = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    )[0];
    expect(ctaText?.innerHTML).toBe('Take me to the main website');
    expect(ctaLink).toBeTruthy();
  });
  it('Should have a CTA link for more information.', () => {
    const { container } = render(<LiteSiteCta />);
    const ctaText = container.querySelectorAll('a span')[1];
    const ctaLink = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    )[0];
    expect(ctaText?.innerHTML).toBe(
      'Find out more about this data-saving version',
    );
    expect(ctaLink).toBeTruthy();
  });
});
