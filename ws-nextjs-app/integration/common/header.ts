import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';

export default service => {
  describe('Header', () => {
    const isAmpPage =
      document.documentElement.hasAttribute('amp') ||
      window.location.pathname.endsWith('.amp');

    it('I can see the branding', () => {
      const logo = document.getElementById('brandSvgHeader');

      expect(logo).toBeInTheDocument();

      const parentElement = logo?.parentNode as Element | null;

      expect(parentElement).toBeTruthy();

      if (!logo || !parentElement) return;

      const brandingLink =
        document.getElementById('topPage') ||
        document.getElementById('brandLink');

      const brandingLabelId = brandingLink?.getAttribute('aria-labelledby');
      const brandingTextElement = brandingLabelId
        ? document.getElementById(brandingLabelId)
        : null;

      expect(brandingTextElement?.textContent).toBeTruthy();

      const svg = logo.querySelector('g path');
      const brandText = brandingTextElement?.textContent ?? '';

      expect({
        svg,
        brandLink: brandText,
      }).toMatchSnapshot();
    });

    if (service !== 'news' && service !== 'scotland') {
      it("I can see the offscreen text with product's language code set to English", () => {
        const langCode = document.querySelector(
          'header div span span[lang="en-GB"]',
        );
        expect(langCode).toBeInTheDocument();
      });
    }

    if (service !== 'scotland') {
      describe('Navigation link', () => {
        const navList = document.querySelector('header nav [role="list"]');
        const navigationLinks = Array.from(
          navList?.querySelectorAll('a') ?? [],
        );

        navigationLinks.forEach(navigationLink => {
          const linkText = navigationLink.textContent;
          const linkUrl = navigationLink.getAttribute('href');

          it('should be in the document', () => {
            expect(navigationLink).toBeInTheDocument();
          });

          it('should contain text', () => {
            expect(linkText).toBeTruthy();
          });

          it('should match text and url', () => {
            expect({
              text: linkText,
              url: linkUrl,
            }).toMatchSnapshot();
          });
        });
      });
    }

    // this check avoids amp noise and limits these checks to services on the new navigation
    if (SERVICES_WITH_NEW_NAV.includes(service) && !isAmpPage) {
      describe('New navigation (using isite config)', () => {
        const topScrollableNav = document.querySelector(
          'header nav [data-e2e="scrollable-nav"]',
        );
        const secondaryScrollableNav = document.querySelector(
          'header nav [data-e2e="scrollable-nav-secondary"]',
        );
        const dropdownNav = document.querySelector(
          'header nav [data-e2e="dropdown-nav"]',
        );
        const menuButton = document.querySelector(
          'header nav button[aria-expanded]',
        );

        const getNavigationLinks = (
          navigationElement: Element | null | undefined,
        ) =>
          Array.from(
            navigationElement?.querySelectorAll('[role="list"] a') || [],
          );

        it('should render separate top and secondary scrollable navigation rows', () => {
          expect(topScrollableNav).toBeInTheDocument();
          expect(secondaryScrollableNav).toBeInTheDocument();
        });

        it('should render a collapsed menu button and dropdown container', () => {
          expect(menuButton).toBeInTheDocument();
          expect(menuButton?.getAttribute('aria-expanded')).toEqual('false');
          expect(dropdownNav).toBeInTheDocument();
        });

        it('should render top and secondary navigation links', () => {
          const topLinks = getNavigationLinks(topScrollableNav);
          const secondaryLinks = getNavigationLinks(secondaryScrollableNav);

          expect(topLinks.length).toBeGreaterThan(1);
          expect(secondaryLinks.length).toBeGreaterThan(0);
        });

        it('should prioritise the first top-level link in the dropdown', () => {
          const topLinks = getNavigationLinks(topScrollableNav);
          const dropdownLinks = getNavigationLinks(dropdownNav);

          expect(dropdownLinks.length).toBeGreaterThan(0);
          expect(dropdownLinks[0]?.textContent).toEqual(
            topLinks[0]?.textContent,
          );
          expect(dropdownLinks[0]?.getAttribute('href')).toEqual(
            topLinks[0]?.getAttribute('href'),
          );
        });
      });
    }

    it('I can see a skip to content link', () => {
      const skipToContentEl = document.querySelector(
        'header [href="#content"]',
      );

      expect(skipToContentEl).toBeInTheDocument();
    });
  });
};
