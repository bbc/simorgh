import { STATIC_REVERB_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';
import { render } from '../react-testing-library-with-providers';
import LiteSiteSummary from '.';

jest.mock('#app/hooks/useHydrationDetection', () => ({
  __esModule: true,
  default: () => false,
}));

describe('LiteSiteSummary', () => {
  it('Should have a hidden strong element with lite site identifier.', () => {
    const { container } = render(<LiteSiteSummary />);
    const strongText = container.querySelector('strong');
    expect(strongText?.innerHTML).toBe('Data saving version');
    expect(strongText).toHaveAttribute('hidden');
  });
  it('Should have a CTA link to the main site.', () => {
    const { container } = render(<LiteSiteSummary />);
    const [ctaText] = container.querySelectorAll('a span');
    const [ctaLink] = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    );
    expect(ctaText?.innerHTML).toBe('Take me to the main website');
    expect(ctaLink).toBeTruthy();
  });
  it('Should have a CTA link for more information with a service that has a translation.', () => {
    const { container } = render(<LiteSiteSummary />, { service: 'gahuza' });
    const [, ctaText] = container.querySelectorAll('a span');
    const [ctaLink] = container.querySelectorAll(
      'a[href="https://www.test.bbc.com/news/articles/c0g992jmmkko"]',
    );
    expect(ctaText?.innerHTML).toBe(
      'Ibindi vyerekeye ingene urwo rubuga rugutwara uburyo (ama mega) buke',
    );
    expect(ctaLink).toBeTruthy();
  });

  it(`Should have click tracking on the 'Back to canonical' link.`, () => {
    const { container } = render(<LiteSiteSummary />, { isLite: true });

    const [ctaLink] = container.querySelectorAll('a');
    const atiUrl = ctaLink.getAttribute(STATIC_REVERB_CLICK_TRACKING);

    expect(atiUrl).toContain('lite-site-summary');
  });

  it('Should render the information page link if informationPageLink exists with a service that has a translation.', () => {
    const { container } = render(<LiteSiteSummary />, {
      service: 'gahuza',
    });

    const informationPageParagraph = container.querySelector(
      '[data-e2e="information-page"]',
    );

    expect(informationPageParagraph).toBeVisible();
  });

  it('Should not render the information page link if informationPageLink does not exist for service.', () => {
    const { container } = render(<LiteSiteSummary />, {
      service: 'news',
    });

    const informationPageParagraph = container.querySelector(
      '[data-e2e="information-page"]',
    );

    expect(informationPageParagraph).toBeNull();
  });
});
