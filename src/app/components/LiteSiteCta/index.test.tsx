import React from 'react';
import { render } from '../react-testing-library-with-providers';
import LiteSiteCta from '.';

describe('LiteSiteCTA', () => {
  it('Should have a hidden strong element with lite site identifier.', () => {
    const { container } = render(<LiteSiteCta />);
    const strongText = container.querySelector('strong');
    expect(strongText?.innerHTML).toBe('Data saving version');
    expect(strongText).toHaveAttribute('hidden');
  });
  it('Should have a CTA link to the main site.', () => {
    const { container } = render(<LiteSiteCta />);
    const [ctaText] = container.querySelectorAll('a span');
    const [ctaLink] = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    );
    expect(ctaText?.innerHTML).toBe('Take me to the main website');
    expect(ctaLink).toBeTruthy();
  });
  it('Should have a CTA link for more information.', () => {
    const { container } = render(<LiteSiteCta />);
    const [, ctaText] = container.querySelectorAll('a span');
    const [ctaLink] = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    );
    expect(ctaText?.innerHTML).toBe(
      'Find out more about this data-saving version',
    );
    expect(ctaLink).toBeTruthy();
  });

  it(`Should have click tracking on the 'Back to canonical' link.`, () => {
    process.env.SIMORGH_ATI_BASE_URL = 'https://logws1363.ati-host.net?';
    const { container } = render(<LiteSiteCta />, { isLite: true });

    const [ctaLink] = container.querySelectorAll('a');
    const atiUrl = ctaLink.getAttribute('data-lite-ati-tracking');

    expect(atiUrl).toContain('lite-site-cta');
  });
});
