import { Services } from '#app/models/types/global';
import { HOME_PAGE, ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import toggleConfigs from '#app/lib/config/toggles';
import { ComponentProps } from 'react';
import CanonicalNavigation from './index.canonical';
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
      fireEvent.blur(lastLink, { key: 'Tab' });

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(document.activeElement).toBe(
        getByRole('link', { name: 'First article' }),
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
    const enableMotion = () => {
      jest.mocked(window.matchMedia).mockImplementation(query => ({
        ...defaultMediaQuery,
        media: query,
        matches: query !== '(prefers-reduced-motion: reduce)',
      }));
    };
    const stickyOptions = {
      service: 'mundo' as Services,
      pageType: HOME_PAGE,
      toggles: toggleConfigs.test,
    };
    const scrollTo = (scrollY: number) => {
      Object.defineProperty(window, 'scrollY', {
        configurable: true,
        value: scrollY,
      });
      fireEvent.scroll(window);
      act(() => {
        jest.advanceTimersByTime(20);
      });
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
        .mockImplementation(query => ({ ...defaultMediaQuery, media: query }));
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

    it.each([240, 299, 300, 301])(
      'only permits sticky navigation from 300px upwards (viewport %spx)',
      width => {
        jest.mocked(window.matchMedia).mockImplementation(query => ({
          ...defaultMediaQuery,
          media: query,
          matches: query === '(min-width: 300px)' ? width >= 300 : true,
        }));
        const { container } = render(navigation, stickyOptions);
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
            : { ...defaultMediaQuery, media: query },
        );
      const { container } = render(navigation, stickyOptions);
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

    it.each<Services>([
      'mundo',
      'portuguese',
      'russian',
      'indonesia',
      'turkce',
      'urdu',
    ])('enables sticky navigation for %s on test', service => {
      const { container } = render(navigation, {
        ...stickyOptions,
        service,
      });
      scrollTo(500);
      scrollTo(450);

      expect(
        container.querySelector('[data-e2e="sticky-nav"]'),
      ).toHaveAttribute('data-sticky-visible', 'true');
    });

    it.each([1, 0, -1])(
      'only shows scroll-up navigation when the first article line is at or above the viewport top (%spx)',
      top => {
        const { container } = render(articleNavigation, {
          ...stickyOptions,
          pageType: ARTICLE_PAGE,
        });
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
      const { container } = render(articleNavigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
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

    it('hides and closes sticky navigation when scrolling back above the first article line', () => {
      const { container } = render(articleNavigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
      scrollTo(500);
      scrollTo(450);
      const menuButton = screen.getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      const firstParagraph = screen.getByText(
        'First line of article body text',
      );
      jest.spyOn(firstParagraph, 'getBoundingClientRect').mockReturnValue({
        ...firstParagraph.getBoundingClientRect(),
        top: 1,
      });

      scrollTo(400);

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(
        container.querySelector('[data-e2e="sticky-nav"]'),
      ).toHaveAttribute('data-sticky-visible', 'false');
    });

    it('does not activate article sticky navigation without an article body paragraph', () => {
      const { container } = render(navigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
      scrollTo(500);
      scrollTo(450);

      expect(
        container.querySelector('[data-e2e="sticky-nav"]'),
      ).toHaveAttribute('data-sticky-visible', 'false');
    });

    it('paints off-screen before sliding in and completes the slide-out before restoring normal positioning', () => {
      enableMotion();
      const { container } = render(articleNavigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
      const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');

      scrollTo(500);
      expect(stickyNav).not.toHaveStyle({ position: 'fixed' });

      scrollTo(450);
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
        top: 1,
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
      const { container } = render(articleNavigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
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
      scrollTo(450);

      expect(stickyNav).not.toHaveAttribute('hidden');
      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      act(() => {
        jest.advanceTimersByTime(40);
      });
      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
    });

    it('cancels the pending slide-in when the user starts scrolling down', () => {
      enableMotion();
      const { container } = render(articleNavigation, {
        ...stickyOptions,
        pageType: ARTICLE_PAGE,
      });
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
        const { container } = render(navigation, {
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

    it('keeps both tiers in a single navigation and reserves their space while fixed', () => {
      const { container, getAllByTestId } = render(navigation, stickyOptions);
      const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');

      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      expect(stickyNav).not.toHaveAttribute('inert');
      scrollTo(500);
      expect(stickyNav).not.toHaveAttribute('aria-hidden');
      expect(stickyNav).not.toHaveAttribute('inert');
      expect(stickyNav).not.toHaveStyle({ position: 'fixed' });

      scrollTo(450);
      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
      expect(stickyNav).not.toHaveAttribute('aria-hidden');
      expect(stickyNav).not.toHaveAttribute('inert');
      expect(stickyNav?.parentElement).toHaveStyle({ height: '88px' });
      expect(getAllByTestId(scrollableTestId)).toHaveLength(2);
      expect(screen.getAllByRole('button', { name: 'menu' })).toHaveLength(1);
      expect(stickyNav).toHaveStyle({ position: 'fixed' });
      expect(stickyNav).toHaveStyle({ transform: 'translateY(0)' });
    });

    it('hides and closes the dropdown when scrolling down', () => {
      const { container, getByRole } = render(navigation, stickyOptions);
      scrollTo(500);
      scrollTo(450);
      const menuButton = getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      scrollTo(460);

      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(
        container.querySelector('[data-e2e="sticky-nav"]'),
      ).toHaveAttribute('data-sticky-visible', 'false');
    });

    it('keeps a sticky dropdown open when there is no vertical scroll movement', () => {
      render(navigation, stickyOptions);
      scrollTo(500);
      scrollTo(450);
      const menuButton = screen.getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);

      scrollTo(450);

      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not close the original dropdown on a normal page scroll', () => {
      const { container } = render(navigation, stickyOptions);
      const slot = container.querySelector(
        '[data-e2e="sticky-nav"]',
      )?.parentElement;
      if (!slot) throw new Error('Navigation slot was not rendered');
      jest.spyOn(slot, 'getBoundingClientRect').mockReturnValue({
        ...slot.getBoundingClientRect(),
        bottom: 88,
      });
      const menuButton = screen.getByRole('button', { name: 'menu' });
      fireEvent.click(menuButton);

      scrollTo(10);

      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    });

    it.each([-65, -64, 0])(
      'restores normal navigation when its original bottom is %spx from the viewport',
      bottom => {
        const { container } = render(navigation, stickyOptions);
        scrollTo(500);
        scrollTo(450);
        const slot = container.querySelector(
          '[data-e2e="sticky-nav"]',
        )?.parentElement;
        if (!slot) throw new Error('Navigation slot was not rendered');
        jest.spyOn(slot, 'getBoundingClientRect').mockReturnValue({
          ...slot.getBoundingClientRect(),
          bottom,
        });

        scrollTo(400);

        expect(slot).not.toHaveStyle({ height: '88px' });
        expect(slot?.firstElementChild).not.toHaveStyle({
          position: 'fixed',
        });
        expect(slot?.firstElementChild).toHaveAttribute(
          'data-sticky-visible',
          'false',
        );
      },
    );

    it('keeps sticky navigation visible and its dropdown open when Tab is pressed', () => {
      const { container } = render(navigation, stickyOptions);
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
      const { container } = render(navigation, stickyOptions);
      fireEvent.keyDown(window, { key: 'Tab' });
      scrollTo(500);
      scrollTo(450);

      expect(
        container.querySelector('[data-e2e="sticky-nav"]'),
      ).toHaveAttribute('data-sticky-visible', 'true');
    });

    it('keeps hidden sticky navigation inert when Tab is pressed', () => {
      const { container } = render(navigation, stickyOptions);
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

    it('cancels a pending scroll update when unmounted', () => {
      const cancelAnimationFrame = jest.spyOn(window, 'cancelAnimationFrame');
      const { unmount } = render(navigation, stickyOptions);
      fireEvent.scroll(window);
      unmount();

      expect(cancelAnimationFrame).toHaveBeenCalledTimes(1);
    });
  });
});
