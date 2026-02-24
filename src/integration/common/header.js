import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';

// added for local test running: normalise import shape - this can be removed when all services have been migrated to the new nav and
const servicesWithNewNav = Array.isArray(SERVICES_WITH_NEW_NAV)
  ? SERVICES_WITH_NEW_NAV
  : SERVICES_WITH_NEW_NAV?.default || [];

export default service => {
  describe('Header', () => {
    const isAmpPage =
      document.documentElement.hasAttribute('amp') ||
      window.location.pathname.endsWith('.amp');

    it('I can see the branding', () => {
      const logo = document.getElementById('brandSvgHeader');
      expect(logo).toBeInTheDocument();

      const logoContainer = logo?.parentNode;
      expect(logoContainer).toBeTruthy();

      const possibleBrandingLinks = [
        document.getElementById('topPage'),
        document.getElementById('brandLink'),
      ];
      const brandingLink = possibleBrandingLinks.find(Boolean);

      const brandingTextId = brandingLink?.getAttribute('aria-labelledby');
      const brandingTextElement = brandingTextId
        ? document.getElementById(brandingTextId)
        : null;

      expect(
        brandingTextElement && brandingTextElement.textContent,
      ).toBeTruthy();
      const brandingText = brandingTextElement?.textContent ?? '';

      const svgPath = logo.querySelector('g path');

      expect({
        svg: svgPath,
        brandLink: brandingText,
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
        const navigationLinks = Array.from(
          document
            .querySelector('header nav [role="list"]')
            .querySelectorAll('a'),
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

    if (servicesWithNewNav.includes(service) && !isAmpPage) {
      describe('New navigation', () => {
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

        const getNavigationLinks = navigationElement =>
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
