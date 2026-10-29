import { Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ComponentProps } from 'react';
import CanonicalNavigation from './index.canonical';
import {
  STICKY_MIN_VIEWPORT_HEIGHT,
  STICKY_NAV_EXIT_BUFFER_PX,
  STICKY_NAV_HIDE_SCROLL_DISTANCE_PX,
} from './config';
import {
  dropdownTestId,
  scrollableTestId,
  dropdownListItems,
  scrollableListItems,
} from './testHelpers';
import {
  render,
  fireEvent,
  act,
  screen,
} from '../react-testing-library-with-providers';

const STICKY_NAVIGATION_TREATMENT = 'newswb_ws_sticky_navigation';
const blocks = [{ id: '1', title: 'Story' }];

const navigationProps: ComponentProps<typeof CanonicalNavigation> = {
  topScrollableListItems: scrollableListItems,
  bottomScrollableListItems: scrollableListItems,
  dropdownListItems,
  stickyTopScrollableListItems: scrollableListItems,
  stickyBottomScrollableListItems: scrollableListItems,
  stickyDropdownListItems: dropdownListItems,
  stickyNavClickTracker: { onClick: jest.fn() },
  stickyNavExperimentVariant: STICKY_NAVIGATION_TREATMENT,
  menuAnnouncedText: 'menu',
  dir: 'ltr',
};

const navigation = (
  <CanonicalNavigation
    topScrollableListItems={scrollableListItems}
    bottomScrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    stickyTopScrollableListItems={scrollableListItems}
    stickyBottomScrollableListItems={scrollableListItems}
    stickyDropdownListItems={dropdownListItems}
    stickyNavClickTracker={{ onClick: jest.fn() }}
    stickyNavExperimentVariant={STICKY_NAVIGATION_TREATMENT}
    menuAnnouncedText="menu"
    dir="ltr"
  />
);

describe('Navigation - Canonical', () => {
  describe('snapshots', () => {
    it('renders the navigation bar correctly', () => {
      const { container } = render(navigation);
      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    it('shows the scrolling menu, with the dropdown menu hidden by default', () => {
      const { queryByTestId, getAllByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId)?.parentElement;
      const [scrollableNavTopRow] = getAllByTestId(scrollableTestId);
      expect(scrollableNavTopRow).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('opens the dropdown menu when the hamburger button is clicked', () => {
      const { getByRole, getByTestId } = render(navigation);

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const dropdown = getByTestId(dropdownTestId);
      expect(dropdown).toHaveTextContent('Item 1');
    });

    it('pressing Tab on the last item in an open dropdown menu closes the menu and moves on to the next item on the page', () => {
      const { getByRole } = render(
        <>
          {navigation}
          <main>
            <a href="/first-article">First article</a>
          </main>
        </>,
      );

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const lastLink = getByRole('link', { name: 'Item 2' });
      lastLink.focus();
      fireEvent.keyDown(lastLink, { key: 'Tab' });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(document.activeElement).toBe(
        getByRole('link', { name: 'First article' }),
      );
    });

    it('pressing Shift+Tab moves backward through the dropdown menu items, then back to the hamburger button', () => {
      const { getByRole } = render(
        <>
          {navigation}
          <main>
            <a href="/first-article">First article</a>
          </main>
        </>,
      );

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      const lastLink = getByRole('link', { name: 'Item 2' });
      lastLink.focus();

      fireEvent.keyDown(lastLink, { key: 'Tab', shiftKey: true });
      expect(document.activeElement).toBe(
        getByRole('link', { name: 'Item 1' }),
      );

      fireEvent.keyDown(document.activeElement as HTMLElement, {
        key: 'Tab',
        shiftKey: true,
      });
      expect(document.activeElement).toBe(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('pressing Tab right after opening the dropdown menu moves focus to its first item', () => {
      const { getByRole } = render(navigation);

      fireEvent.click(getByRole('button', { name: 'menu' }));
      fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Tab' });

      expect(document.activeElement).toBe(
        getByRole('link', { name: 'Item 1' }),
      );
    });

    it('pressing Tab moves forward through the dropdown menu items, one by one', () => {
      const { getByRole } = render(navigation);

      fireEvent.click(getByRole('button', { name: 'menu' }));
      const firstLink = getByRole('link', { name: 'Item 1' });
      firstLink.focus();
      fireEvent.keyDown(firstLink, { key: 'Tab' });

      expect(document.activeElement).toBe(
        getByRole('link', { name: 'Item 2' }),
      );
    });

    describe('the related articles block ("Top Bar onward journeys")', () => {
      it.each([
        [
          'does not show the related articles block when the feature is turned off',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: false } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).toBeNull(),
        ],
        [
          'shows the related articles block when the feature is turned on and there are articles to show',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: true } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).not.toBeNull(),
        ],
        [
          'does not show the related articles block when there are no articles to show, even if the feature is turned on',
          { ...navigationProps, blocks: [] },
          { topBarOJs: { enabled: true } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).toBeNull(),
        ],
      ])('%s', (_, props, toggles, assertion) => {
        // @ts-expect-error partial data for testing purposes
        const { queryByTestId } = render(<CanonicalNavigation {...props} />, {
          toggles,
        });
        assertion(queryByTestId);
      });
    });
  });

  describe('sticky navigation', () => {
    const defaultMediaQuery = window.matchMedia('');
    const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
    const LANDSCAPE_QUERY = '(orientation: landscape) and (max-height: 500px)';
    const MIN_HEIGHT_QUERY = `(min-height: ${STICKY_MIN_VIEWPORT_HEIGHT}px)`;
    const nonMatchingByDefault = [REDUCED_MOTION_QUERY, LANDSCAPE_QUERY];
    const defaultMatchMediaImplementation = (query: string) => ({
      ...defaultMediaQuery,
      media: query,
      matches: nonMatchingByDefault.includes(query)
        ? false
        : defaultMediaQuery.matches,
    });
    const enableMotion = () => {
      jest.mocked(window.matchMedia).mockImplementation(query => ({
        ...defaultMediaQuery,
        media: query,
        matches: !nonMatchingByDefault.includes(query),
      }));
    };
    const stickyOptions = {
      service: 'mundo' as Services,
      pageType: ARTICLE_PAGE,
      toggles: {
        topBarOJs: { enabled: true },
      },
    };
    // Settles the full, non-reduced-motion slide-in animation (scroll
    // handler rAF + two nested position rAFs). Each animation frame is only
    // scheduled once the previous one's effect has committed, so the advance
    // is split across several separate `act` flushes rather than a single
    // large one. Pass a lower `frames` count to inspect an intermediate,
    // not-yet-animated state instead.
    const scrollTo = (scrollY: number, frames = 4) => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: scrollY,
      });
      fireEvent.scroll(window);
      for (let frame = 0; frame < frames; frame += 1) {
        act(() => {
          jest.advanceTimersByTime(20);
        });
      }
    };

    const articleNavigation = (
      <>
        {navigation}
        <main>
          <h1>Article headline</h1>
          <p>Image caption before the article body</p>
          <p data-sticky-nav-anchor>First line of article body text</p>
        </main>
      </>
    );

    beforeEach(() => {
      jest.useFakeTimers();
      jest
        .mocked(window.matchMedia)
        .mockImplementation(defaultMatchMediaImplementation);
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 0,
      });
      jest
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockReturnValue({
          x: 0,
          y: -288,
          top: -288,
          bottom: -200,
          left: 0,
          right: 320,
          width: 320,
          height: 88,
          toJSON: () => ({}),
        });
    });

    afterEach(() => {
      jest.restoreAllMocks();
      jest.useRealTimers();
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: 0,
      });
    });

    describe("where the sticky navigation bar is, and isn't, available", () => {
      it.each([240, 299, 300, 301])(
        'only shows the sticky navigation bar once the screen is at least 300px wide (testing %spx)',
        width => {
          jest.mocked(window.matchMedia).mockImplementation(query => ({
            ...defaultMediaQuery,
            media: query,
            matches:
              // eslint-disable-next-line no-nested-ternary
              query === '(min-width: 300px)'
                ? width >= 300
                : !nonMatchingByDefault.includes(query),
          }));
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');

          if (width < 300) {
            expect(stickyNav).not.toBeInTheDocument();
            expect(
              screen.getByRole('button', { name: 'menu' }),
            ).toBeInTheDocument();
          } else {
            expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
          }
        },
      );

      it('hides the sticky navigation bar if the screen narrows below 300px, then brings it back if it widens again', () => {
        const addListener = jest.fn();
        const mediaQuery = {
          ...defaultMediaQuery,
          media: '(min-width: 300px)',
          addListener,
        };
        jest
          .mocked(window.matchMedia)
          .mockImplementation(query =>
            query === mediaQuery.media
              ? mediaQuery
              : defaultMatchMediaImplementation(query),
          );
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        fireEvent.click(screen.getByRole('button', { name: 'menu' }));
        const handleChange = addListener.mock.calls[0][0];

        act(() => {
          handleChange({ ...mediaQuery, matches: false });
        });

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
        expect(screen.getByRole('button', { name: 'menu' })).toHaveAttribute(
          'aria-expanded',
          'false',
        );

        act(() => {
          handleChange({ ...mediaQuery, matches: true });
        });
        scrollTo(400);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('does not show the sticky navigation bar on wide, desktop-sized screens', () => {
        jest.mocked(window.matchMedia).mockImplementation(query => ({
          ...defaultMediaQuery,
          media: query,
          matches:
            // eslint-disable-next-line no-nested-ternary
            query === '(max-width: 1007px)'
              ? false
              : !nonMatchingByDefault.includes(query),
        }));
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
      });

      it('does not show the sticky navigation bar on short, landscape screens, such as a phone turned sideways', () => {
        jest.mocked(window.matchMedia).mockImplementation(query => ({
          ...defaultMediaQuery,
          media: query,
          matches: query === LANDSCAPE_QUERY,
        }));
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
      });

      it('does not show the sticky navigation bar on screens too short to fit it', () => {
        jest.mocked(window.matchMedia).mockImplementation(query => ({
          ...defaultMediaQuery,
          media: query,
          matches:
            // eslint-disable-next-line no-nested-ternary
            query === MIN_HEIGHT_QUERY
              ? false
              : !nonMatchingByDefault.includes(query),
        }));
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
      });

      it('does not show the sticky navigation bar at all if the reader has asked their device to reduce motion', () => {
        jest.mocked(window.matchMedia).mockImplementation(query => ({
          ...defaultMediaQuery,
          media: query,
          matches: query === REDUCED_MOTION_QUERY,
        }));
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
      });

      it.each<Services>([
        'mundo',
        'portuguese',
        'russian',
        'indonesia',
        'turkce',
        'urdu',
      ])(
        'shows the sticky navigation bar on the %s edition on the test environment',
        service => {
          const { container } = render(articleNavigation, {
            ...stickyOptions,
            service,
          });
          scrollTo(500);
          scrollTo(450);

          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).toHaveAttribute('data-sticky-visible', 'true');
        },
      );

      it.each([
        ['Lite', { isLite: true }],
        ['live', { bbcOrigin: 'https://www.bbc.com' }],
      ])(
        'does not show the sticky navigation bar when the page is %s',
        (_, options) => {
          const { container } = render(navigation, {
            ...stickyOptions,
            ...options,
          });
          scrollTo(500);
          scrollTo(450);

          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).not.toBeInTheDocument();
        },
      );
    });

    describe('showing and hiding the bar as the reader scrolls past the start of the article', () => {
      it.each([1, 0, -1])(
        'only shows the sticky navigation bar once the reader has scrolled back up to the start of the article (testing %spx from the top of the screen)',
        top => {
          const { container } = render(articleNavigation, stickyOptions);
          const firstParagraph = screen.getByText(
            'First line of article body text',
          );
          jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
            ...firstParagraph.getBoundingClientRect(),
            top,
          });

          scrollTo(500);
          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).toHaveAttribute('data-sticky-visible', 'false');

          scrollTo(450);
          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).toHaveAttribute('data-sticky-visible', top <= 0 ? 'true' : 'false');
        },
      );

      it('does not pin the navigation bar to the screen while scrolling down past the start of the article', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        const paragraphBounds = jest.spyOn(
          firstParagraph,
          'getBoundingClientRect',
        );
        const bounds = firstParagraph.getBoundingClientRect();
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');

        paragraphBounds.mockReturnValue({ ...bounds, top: 1 });
        scrollTo(499);
        paragraphBounds.mockReturnValue({ ...bounds, top: 0 });
        scrollTo(500);
        paragraphBounds.mockReturnValue({ ...bounds, top: -1 });
        scrollTo(501);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).not.toHaveStyle({ position: 'fixed' });
        expect(stickyNav).not.toHaveStyle({
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        });
        expect(stickyNav?.parentElement).not.toHaveStyle({ height: '88px' });

        scrollTo(500);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
        expect(stickyNav).toHaveStyle({ position: 'fixed' });
      });

      it('hides the sticky navigation bar, and closes its dropdown menu, once the reader scrolls back up well past the start of the article', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });

        scrollTo(400);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('returns to the normal navigation at the top of the page when the article starts within the exit distance', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        const paragraphBounds = jest
          .spyOn(firstParagraph, 'getBoundingClientRect')
          .mockReturnValue({
            ...firstParagraph.getBoundingClientRect(),
            top: -1,
          });

        scrollTo(500);
        scrollTo(450);
        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');

        paragraphBounds.mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: 400,
        });
        scrollTo(0);
        act(() => {
          jest.advanceTimersByTime(400);
        });

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).not.toHaveStyle({ position: 'fixed' });
      });

      it('keeps the dropdown menu open if tabbing through it causes a tiny, automatic scroll adjustment that would otherwise have hidden the bar', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });

        scrollTo(400);

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('still closes the dropdown menu on a genuine scroll back up the page, once enough time has passed since the last Tab press', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });
        act(() => {
          jest.advanceTimersByTime(400);
        });
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });

        scrollTo(400);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('keeps the sticky navigation bar on screen as long as the reader has not scrolled too far back up past the start of the article', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX - 1,
        });

        scrollTo(400);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('does not show the sticky navigation bar on a page with no article text to scroll past', () => {
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });
    });

    describe('how the sticky navigation bar animates in and out', () => {
      it('slides the navigation bar fully into view before showing it, and finishes sliding it away before putting it back in the normal page layout', () => {
        enableMotion();
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');

        scrollTo(500);
        expect(stickyNav).not.toHaveStyle({ position: 'fixed' });

        scrollTo(450, 1);
        expect(stickyNav).toHaveStyle({ position: 'fixed' });
        expect(stickyNav).toHaveStyle({ transform: 'translateY(-100%)' });
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).toHaveAttribute('hidden');

        act(() => {
          jest.advanceTimersByTime(16);
        });
        expect(stickyNav).not.toHaveAttribute('hidden');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');

        act(() => {
          jest.advanceTimersByTime(24);
        });
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
        expect(stickyNav).toHaveStyle({ transform: 'translateY(0)' });

        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });
        scrollTo(400);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).toHaveStyle({ position: 'fixed' });
        expect(stickyNav).toHaveStyle({ transform: 'translateY(-100%)' });
        expect(stickyNav).toHaveAttribute('inert');
        expect(stickyNav).not.toHaveAttribute('hidden');
        expect(stickyNav?.parentElement).toHaveStyle({ height: '88px' });

        act(() => {
          jest.advanceTimersByTime(400);
        });
        expect(stickyNav).not.toHaveStyle({ position: 'fixed' });
        expect(stickyNav?.parentElement).not.toHaveStyle({ height: '88px' });
      });

      it('does not flicker the navigation bar out of sight when it is about to reappear a second time', () => {
        enableMotion();
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        act(() => {
          jest.advanceTimersByTime(400);
        });
        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);
        act(() => {
          jest.advanceTimersByTime(400);
        });
        scrollTo(450, 1);

        expect(stickyNav).not.toHaveAttribute('hidden');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        act(() => {
          jest.advanceTimersByTime(40);
        });
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('stops the navigation bar sliding into view if the reader starts scrolling back down again', () => {
        enableMotion();
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);
        act(() => {
          jest.advanceTimersByTime(400);
        });

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('keeps the sticky navigation visible and its dropdown open while scrolling down with the dropdown open', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);

        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX - 1);

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('blocks gestures over the dropdown without blocking navigation row scrolling', () => {
        const { container, getByTestId } = render(
          articleNavigation,
          stickyOptions,
        );
        scrollTo(500);
        scrollTo(450);
        fireEvent.click(screen.getByRole('button', { name: 'menu' }));

        const dropdown = getByTestId(dropdownTestId);
        const navigationRow = container.querySelector(
          '[data-e2e="scrollable-nav-secondary"]',
        );
        const dropdownWheelEvent = new Event('wheel', {
          bubbles: true,
          cancelable: true,
        });
        const navigationRowWheelEvent = new Event('wheel', {
          bubbles: true,
          cancelable: true,
        });

        dropdown.dispatchEvent(dropdownWheelEvent);
        navigationRow?.dispatchEvent(navigationRowWheelEvent);

        expect(dropdownWheelEvent.defaultPrevented).toBe(true);
        expect(navigationRowWheelEvent.defaultPrevented).toBe(false);
      });

      it('hides on scroll down as normal once the dropdown has been closed', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);

        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('scrolls the second row of links back to the start once the sticky navigation bar hides', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const secondaryScroll = container.querySelector(
          '[data-e2e="scrollable-nav-secondary"]',
        ) as HTMLElement;
        secondaryScroll.scrollLeft = 120;

        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });
        scrollTo(400);

        expect(secondaryScroll.scrollLeft).toBe(0);
      });

      it('scrolls the second row of links back to the start even when the bar only slides out of view, rather than disappearing completely', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const secondaryScroll = container.querySelector(
          '[data-e2e="scrollable-nav-secondary"]',
        ) as HTMLElement;
        secondaryScroll.scrollLeft = 120;

        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).toHaveStyle({ position: 'fixed' });
        expect(secondaryScroll.scrollLeft).toBe(0);
      });

      it('scrolls the second row of links back to the start every time the bar hides and reappears, not just the first time', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const secondaryScroll = container.querySelector(
          '[data-e2e="scrollable-nav-secondary"]',
        ) as HTMLElement;

        scrollTo(500);
        scrollTo(450);
        secondaryScroll.scrollLeft = 120;
        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);
        expect(secondaryScroll.scrollLeft).toBe(0);

        scrollTo(500);
        scrollTo(450);
        secondaryScroll.scrollLeft = 80;
        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);
        expect(secondaryScroll.scrollLeft).toBe(0);
      });
    });

    describe('using the keyboard with the sticky navigation bar and its dropdown menu', () => {
      it('keeps the sticky navigation bar and its open dropdown menu on screen while tabbing through it', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });
        scrollTo(400);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
        expect(stickyNav).not.toHaveAttribute('inert');
        expect(stickyNav).toHaveStyle({ position: 'fixed' });
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      it('closes a dropdown opened in the original navigation before the sticky navigation appears', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const menuButtons = screen.getAllByRole('button', { name: 'menu' });
        const originalMenuButton = menuButtons[0];
        fireEvent.click(originalMenuButton);
        expect(originalMenuButton).toHaveAttribute('aria-expanded', 'true');

        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
        expect(originalMenuButton).toHaveAttribute('aria-expanded', 'false');
        expect(
          container.querySelector(
            '[data-e2e="sticky-nav"] button[aria-label="menu"]',
          ),
        ).toHaveAttribute('aria-expanded', 'false');
      });

      it('hides the sticky navigation bar a short while after Tab moves focus back up the page, even if the reader does not scroll again themselves', () => {
        const { container } = render(
          <>
            {articleNavigation}
            <a href="/top-of-page">Top of page link</a>
          </>,
          stickyOptions,
        );
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });

        // Tab carrying focus onto an element back at the top of the page is
        // a real, deliberate scroll, not an incidental nudge — but it still
        // happens to fall inside the suppression window set by that same
        // Tab press, which is the scenario this test exercises.
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER_PX + 1,
        });
        scrollTo(0);

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');

        // No further scroll event arrives once the reader has landed on the
        // link — only the suppression window elapsing should prompt the bar
        // to re-check itself against where the scroll actually ended up.
        act(() => {
          jest.advanceTimersByTime(400);
        });

        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('lets the sticky navigation bar appear on scroll-up for a reader who has only ever used the keyboard, never the mouse', () => {
        const { container } = render(articleNavigation, stickyOptions);
        fireEvent.keyDown(window, { key: 'Tab' });
        act(() => {
          jest.advanceTimersByTime(500);
        });
        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('does not show the sticky navigation bar when pressing Tab causes the page to nudge up by just a pixel or two', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        fireEvent.keyDown(window, { key: 'Tab' });
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('still shows the sticky navigation bar on scroll-up after pressing Shift+Tab to move backward', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it.each(['ArrowUp', 'PageUp', 'Home'])(
        'shows the sticky navigation bar on scroll-up after pressing %s to move around the page',
        key => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          fireEvent.keyDown(window, { key });
          scrollTo(450);

          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).toHaveAttribute('data-sticky-visible', 'true');
        },
      );

      it('still shows the sticky navigation bar on a genuine scroll-up, once enough time has passed since the last Tab press', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        fireEvent.keyDown(window, { key: 'Tab' });
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');

        act(() => {
          jest.advanceTimersByTime(500);
        });
        scrollTo(400);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('keeps a hidden sticky navigation bar unreachable by the keyboard while tabbing through the page', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        scrollTo(450 + STICKY_NAV_HIDE_SCROLL_DISTANCE_PX);
        fireEvent.keyDown(window, { key: 'Tab' });

        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).toHaveAttribute('inert');
        expect(stickyNav).toHaveAttribute('aria-hidden', 'true');
      });

      it('does not close the dropdown menu at the top of the page while tabbing through its links', () => {
        render(navigation, stickyOptions);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      describe('which parts of the pinned bar the Tab key can reach', () => {
        // The dropdown's links are hidden from the accessibility tree while
        // closed (via CSS visibility), so `getByRole` can't see them until
        // it's open; a plain DOM query is used instead for closed-state
        // checks.
        const getDropdownLinks = (container: HTMLElement) =>
          container.querySelectorAll(`[data-testid="${dropdownTestId}"] a`);

        it('cannot reach the dropdown menu links with the Tab key before the menu is opened', () => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);

          const [itemOne, itemTwo] = getDropdownLinks(container);
          expect(itemOne).toHaveAttribute('tabindex', '-1');
          expect(itemTwo).toHaveAttribute('tabindex', '-1');
        });

        // Browsers make overflow containers keyboard-focusable so they can be
        // scrolled with the arrow keys, so the rows take focus in their own
        // right even though they are neither a link nor a button.
        it('cannot reach either row of scrolling links with the Tab key', () => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);

          expect(
            container.querySelector('[data-e2e="scrollable-nav"]'),
          ).toHaveAttribute('tabindex', '-1');
          expect(
            container.querySelector('[data-e2e="scrollable-nav-secondary"]'),
          ).toHaveAttribute('tabindex', '-1');
        });

        it('still cannot reach either row of scrolling links with the Tab key while the dropdown menu is open', () => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          fireEvent.click(screen.getByRole('button', { name: 'menu' }));

          expect(
            container.querySelector('[data-e2e="scrollable-nav"]'),
          ).toHaveAttribute('tabindex', '-1');
          expect(
            container.querySelector('[data-e2e="scrollable-nav-secondary"]'),
          ).toHaveAttribute('tabindex', '-1');
        });

        it('can reach the rows of scrolling links with the Tab key again once the bar is no longer pinned to the screen', () => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          scrollTo(500);
          act(() => {
            jest.advanceTimersByTime(400);
          });

          expect(
            container.querySelector('[data-e2e="scrollable-nav"]'),
          ).not.toHaveAttribute('tabindex');
          expect(
            container.querySelector('[data-e2e="scrollable-nav-secondary"]'),
          ).not.toHaveAttribute('tabindex');
        });

        // Clicking a button doesn't focus it in every browser, which would
        // otherwise leave the next Tab press starting from the top of the
        // page rather than carrying on into the dropdown.
        it('moves focus to the hamburger button when the dropdown menu is opened with the mouse', () => {
          render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          const menuButton = screen.getByRole('button', { name: 'menu' });
          fireEvent.click(menuButton);

          expect(document.activeElement).toBe(menuButton);
        });

        it('makes the dropdown menu links the only part of the bar reachable with the Tab key once the menu is opened', () => {
          render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          fireEvent.click(screen.getByRole('button', { name: 'menu' }));

          // Set outright rather than left absent, so the items are tab stops
          // even where links are not tabbable by default (macOS keyboard
          // navigation). See useStickyNavigation.
          expect(screen.getByRole('link', { name: 'Item 1' })).toHaveAttribute(
            'tabindex',
            '0',
          );
          expect(screen.getByRole('link', { name: 'Item 2' })).toHaveAttribute(
            'tabindex',
            '0',
          );
          expect(screen.getByRole('button', { name: 'menu' })).toHaveAttribute(
            'tabindex',
            '-1',
          );
        });

        it('cannot reach the dropdown menu links with the Tab key again once the menu is closed', () => {
          const { container } = render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          const menuButton = screen.getByRole('button', { name: 'menu' });
          fireEvent.click(menuButton);
          fireEvent.click(menuButton);

          const [itemOne, itemTwo] = getDropdownLinks(container);
          expect(itemOne).toHaveAttribute('tabindex', '-1');
          expect(itemTwo).toHaveAttribute('tabindex', '-1');
        });

        it('pressing the Escape key closes the dropdown menu and returns focus to the hamburger button', () => {
          render(articleNavigation, stickyOptions);
          scrollTo(500);
          scrollTo(450);
          const menuButton = screen.getByRole('button', { name: 'menu' });
          fireEvent.click(menuButton);
          const firstLink = screen.getByRole('link', { name: 'Item 1' });
          firstLink.focus();

          fireEvent.keyDown(document, { key: 'Escape' });

          expect(menuButton).toHaveAttribute('aria-expanded', 'false');
          expect(document.activeElement).toBe(menuButton);
          expect(firstLink).toHaveAttribute('tabindex', '-1');
        });
      });

      describe('page structure and screen reader landmarks', () => {
        it('keeps the related articles block separate from the sticky navigation bar', () => {
          const { container } = render(
            // @ts-expect-error partial data for testing purposes
            <CanonicalNavigation {...navigationProps} blocks={blocks} />,
            stickyOptions,
          );
          const topBar = screen.getByTestId('top-bar-onward-journeys');
          expect(topBar.closest('[data-e2e="sticky-nav"]')).toBeNull();
          expect(container).toContainElement(topBar);
        });

        it('does not create an extra navigation landmark for the related articles block, for screen reader users', () => {
          render(
            // @ts-expect-error partial data for testing purposes
            <CanonicalNavigation {...navigationProps} blocks={blocks} />,
            stickyOptions,
          );

          expect(screen.getAllByRole('navigation')).toHaveLength(1);
        });
      });

      it('leaves enough space for the sticky navigation bar when the browser scrolls a focused item into view', () => {
        render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(document.documentElement.style.scrollPaddingTop).toBe('88px');

        scrollTo(500);
        expect(document.documentElement.style.scrollPaddingTop).toBe('');
      });

      it('scrolls the page so a newly focused item is not left hidden behind the sticky navigation bar', () => {
        const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation();
        render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        const headline = screen.getByText('Article headline');
        jest.spyOn(headline, 'getBoundingClientRect').mockReturnValue({
          ...headline.getBoundingClientRect(),
          top: 20,
        });
        fireEvent.focusIn(headline);

        // The bar is 88px tall and the headline sits 20px from the top of the
        // viewport, so the page scrolls back up by the 68px it covers.
        expect(scrollBy).toHaveBeenCalledWith(0, -68);
      });

      it('does not scroll the page when focus moves to something inside the sticky navigation bar itself', () => {
        const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation();
        render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        fireEvent.focusIn(screen.getByRole('button', { name: 'menu' }));

        expect(scrollBy).not.toHaveBeenCalled();
      });
    });

    describe('tidying up after itself', () => {
      it('stops any pending work when the navigation bar is removed from the page', () => {
        const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
        const { unmount } = render(navigation, stickyOptions);
        fireEvent.scroll(window);
        unmount();

        expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
      });
    });
  });
});
