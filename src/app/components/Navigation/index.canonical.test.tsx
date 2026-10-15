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
      expect(stickyNav).toHaveAttribute('aria-hidden', 'true');
      expect(stickyNav).toHaveAttribute('inert');
      expect(stickyNav?.parentElement).toHaveStyle({ height: '88px' });

      scrollTo(450);
      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
      expect(stickyNav).not.toHaveAttribute('aria-hidden');
      expect(stickyNav).not.toHaveAttribute('inert');
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

    it('disables sticky navigation for Tab and re-enables it after pointer interaction', () => {
      const { container } = render(navigation, stickyOptions);
      const stickyNav = container.querySelector('[data-e2e="sticky-nav"]');
      scrollTo(500);
      scrollTo(450);
      fireEvent.keyDown(window, { key: 'Tab' });
      scrollTo(400);

      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'false');
      expect(stickyNav).not.toHaveAttribute('inert');
      expect(stickyNav).not.toHaveStyle({ position: 'fixed' });

      fireEvent.mouseDown(window);
      scrollTo(350);
      expect(stickyNav).toHaveAttribute('data-sticky-visible', 'true');
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
