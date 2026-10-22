import { Services } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import toggleConfigs from '#app/lib/config/toggles';
import { ComponentProps } from 'react';
import CanonicalNavigation, { STICKY_NAV_EXIT_BUFFER } from './index.canonical';
import { STICKY_MIN_VIEWPORT_HEIGHT } from './config';
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

const blocks = [{ id: '1', title: 'Story' }];

const navigationProps: ComponentProps<typeof CanonicalNavigation> = {
  topScrollableListItems: scrollableListItems,
  bottomScrollableListItems: scrollableListItems,
  dropdownListItems,
  menuAnnouncedText: 'menu',
  dir: 'ltr',
};

const navigation = (
  <CanonicalNavigation
    topScrollableListItems={scrollableListItems}
    bottomScrollableListItems={scrollableListItems}
    dropdownListItems={dropdownListItems}
    menuAnnouncedText="menu"
    dir="ltr"
  />
);

describe('Navigation - Canonical', () => {
  describe('snapshots', () => {
    it('should correctly render Canonical navigation', () => {
      const { container } = render(navigation);
      expect(container).toMatchSnapshot();
    });
  });

  describe('assertions', () => {
    it('should render scrollable nav and hide dropdown', () => {
      const { queryByTestId, getAllByTestId } = render(navigation);
      const dropdown = queryByTestId(dropdownTestId)?.parentElement;
      const [scrollableNavTopRow] = getAllByTestId(scrollableTestId);
      expect(scrollableNavTopRow).toBeInTheDocument();
      expect(dropdown).toHaveAttribute('height', '0');
    });

    it('should render dropdown and no scrollable nav after menu button clicked', () => {
      const { getByRole, getByTestId } = render(navigation);

      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      const dropdown = getByTestId(dropdownTestId);
      expect(dropdown).toHaveTextContent('Item 1');
    });

    it('should close the menu and move focus to the first item on the page when Tab is pressed on the last dropdown item', () => {
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

    it('leaves backward keyboard navigation out of the dropdown to the browser', () => {
      const { getByRole } = render(
        <>
          {navigation}
          <main>
            <a href="/first-article">First article</a>
          </main>
        </>,
      );

      fireEvent.click(getByRole('button', { name: 'menu' }));
      const lastLink = getByRole('link', { name: 'Item 2' });
      lastLink.focus();
      fireEvent.keyDown(lastLink, { key: 'Tab', shiftKey: true });

      expect(document.activeElement).toBe(lastLink);
      expect(getByRole('button', { name: 'menu' })).toHaveAttribute(
        'aria-expanded',
        'true',
      );
    });

    describe('Top Bar OJs', () => {
      it.each([
        [
          'should not render TopBarOJs when toggle is off',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: false } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).toBeNull(),
        ],
        [
          'should render TopBarOJs when toggle is on and blocks are provided',
          { ...navigationProps, blocks },
          { topBarOJs: { enabled: true } },
          queryByTestId =>
            expect(queryByTestId('top-bar-onward-journeys')).not.toBeNull(),
        ],
        [
          'should not render TopBarOJs when blocks are empty even if toggle is on',
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
      toggles: toggleConfigs.test,
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

    describe('eligible and ineligible environments and services', () => {
      it.each([240, 299, 300, 301])(
        'only permits sticky navigation from 300px upwards (viewport %spx)',
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

      it('restores normal navigation below 300px and allows sticky navigation again after widening', () => {
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

      it('disables sticky navigation above the 1007px desktop breakpoint', () => {
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

      it('disables sticky navigation in constrained-height landscape orientation', () => {
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

      it('disables sticky navigation on viewports too short to spare the space', () => {
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

      it('disables sticky navigation entirely when the user prefers reduced motion', () => {
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
      ])('enables sticky navigation for %s on test', service => {
        const { container } = render(articleNavigation, {
          ...stickyOptions,
          service,
        });
        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it.each<Services>([
        'mundo',
        'portuguese',
        'russian',
        'indonesia',
        'turkce',
        'urdu',
      ])(
        'enables sticky navigation for %s during normal local development',
        service => {
          const { container } = render(articleNavigation, {
            ...stickyOptions,
            service,
            bbcOrigin: 'http://localhost:7081',
            toggles: toggleConfigs.local,
          });
          scrollTo(500);
          scrollTo(450);

          expect(
            container.querySelector('[data-e2e="sticky-nav"]'),
          ).toHaveAttribute('data-sticky-visible', 'true');
        },
      );

      it.each([
        ['live', { bbcOrigin: 'https://www.bbc.com' }],
        ['another service', { service: 'arabic' as Services }],
        ['Lite', { isLite: true }],
      ])('does not allow local sticky navigation on %s', (_, options) => {
        const { container } = render(navigation, {
          ...stickyOptions,
          bbcOrigin: 'http://localhost:7081',
          toggles: toggleConfigs.local,
          ...options,
        });

        expect(container.querySelector('[data-e2e="sticky-nav"]')).toBeNull();
      });

      it.each([
        ['another service', { service: 'arabic' as Services }],
        ['Lite', { isLite: true }],
        ['live', { bbcOrigin: 'https://www.bbc.com' }],
        ['a disabled toggle', { toggles: toggleConfigs.live }],
        ['a missing toggle', { toggles: {} }],
      ])('does not enable sticky navigation for %s', (_, options) => {
        const { container } = render(navigation, {
          ...stickyOptions,
          ...options,
        });
        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).not.toBeInTheDocument();
      });
    });

    describe('article scroll-position thresholds', () => {
      it.each([1, 0, -1])(
        'only shows scroll-up navigation when the first article line is at or above the viewport top (%spx)',
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

      it('does not switch to fixed positioning while scrolling down across the article activation point', () => {
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

      it('hides and closes sticky navigation when scrolling back well above the first article line', () => {
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
          top: STICKY_NAV_EXIT_BUFFER + 1,
        });

        scrollTo(400);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('keeps sticky navigation on screen while the article start is still within the exit buffer', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const firstParagraph = screen.getByText(
          'First line of article body text',
        );
        jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
          ...firstParagraph.getBoundingClientRect(),
          top: STICKY_NAV_EXIT_BUFFER - 1,
        });

        scrollTo(400);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('does not activate article sticky navigation without an article body paragraph', () => {
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });
    });

    describe('animation and transition timing', () => {
      it('paints off-screen before sliding in and completes the slide-out before restoring normal positioning', () => {
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
          top: STICKY_NAV_EXIT_BUFFER + 1,
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

      it('does not hide the positioned navigation when preparing a repeat entrance', () => {
        enableMotion();
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        act(() => {
          jest.advanceTimersByTime(400);
        });
        scrollTo(460);
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

      it('cancels the pending slide-in when the user starts scrolling down', () => {
        enableMotion();
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        scrollTo(460);
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

        scrollTo(460);

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
      });

      it('hides on scroll down as normal once the dropdown has been closed', () => {
        const { container } = render(articleNavigation, stickyOptions);
        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        scrollTo(500);
        scrollTo(450);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.click(menuButton);

        scrollTo(460);

        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      });
    });

    describe('keyboard and dropdown accessibility', () => {
      it('keeps sticky navigation visible and its dropdown open when Tab is pressed', () => {
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

      it('allows sticky navigation to appear on scroll-up after keyboard navigation without pointer interaction', () => {
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

      it('does not activate sticky navigation when a forward Tab press causes an incidental upward scroll correction', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        fireEvent.keyDown(window, { key: 'Tab' });
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'false');
      });

      it('still activates sticky navigation on scroll-up after Shift+Tab (backward) keyboard navigation', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
        scrollTo(450);

        expect(
          container.querySelector('[data-e2e="sticky-nav"]'),
        ).toHaveAttribute('data-sticky-visible', 'true');
      });

      it.each(['ArrowUp', 'PageUp', 'Home'])(
        'activates sticky navigation on scroll-up after purposeful %s keyboard navigation',
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

      it('allows a later genuine scroll-up to activate sticky navigation once the forward Tab suppression window has elapsed', () => {
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

      it('keeps hidden sticky navigation inert when Tab is pressed', () => {
        const { container } = render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        scrollTo(460);
        fireEvent.keyDown(window, { key: 'Tab' });

        const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
        expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
        expect(stickyNav).toHaveAttribute('inert');
        expect(stickyNav).toHaveAttribute('aria-hidden', 'true');
      });

      it('does not close the original dropdown when tabbing through its links', () => {
        render(navigation, stickyOptions);
        const menuButton = screen.getByRole('button', { name: 'menu' });
        fireEvent.click(menuButton);
        fireEvent.keyDown(window, { key: 'Tab' });

        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      describe('structure and landmarks', () => {
        it('leaves Top Bar onward journeys outside the fixed navigation', () => {
          const { container } = render(
            // @ts-expect-error partial data for testing purposes
            <CanonicalNavigation {...navigationProps} blocks={blocks} />,
            stickyOptions,
          );
          const topBar = screen.getByTestId('top-bar-onward-journeys');
          expect(topBar.closest('[data-e2e="sticky-nav"]')).toBeNull();
          expect(container).toContainElement(topBar);
        });

        it('does not create a duplicate navigation landmark for Top Bar onward journeys', () => {
          render(
            // @ts-expect-error partial data for testing purposes
            <CanonicalNavigation {...navigationProps} blocks={blocks} />,
            stickyOptions,
          );

          expect(screen.getAllByRole('navigation')).toHaveLength(1);
        });
      });

      it('offsets keyboard scrolling by the sticky nav height while it is visible', () => {
        render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        expect(document.documentElement.style.scrollPaddingTop).toBe('88px');

        scrollTo(500);
        expect(document.documentElement.style.scrollPaddingTop).toBe('');
      });

      it('scrolls an element that takes focus out from behind the sticky navigation', () => {
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

      it('leaves focus within the sticky navigation itself alone', () => {
        const scrollBy = jest.spyOn(window, 'scrollBy').mockImplementation();
        render(articleNavigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);

        fireEvent.focusIn(screen.getByRole('button', { name: 'menu' }));

        expect(scrollBy).not.toHaveBeenCalled();
      });
    });

    describe('lifecycle', () => {
      it('cancels a pending scroll update when unmounted', () => {
        const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
        const { unmount } = render(navigation, stickyOptions);
        fireEvent.scroll(window);
        unmount();

        expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
      });
    });
  });
});
