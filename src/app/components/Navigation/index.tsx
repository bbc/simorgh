import React, { use } from 'react';
import { NavigationUl, NavigationLi } from '#psammead/psammead-navigation/src';
import {
  DropdownUl,
  DropdownLi,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import { Direction, Navigation, PageTypes } from '#app/models/types/global';
import {
  TV_PAGE,
  LIVE_TV_PAGE,
  AUDIO_PAGE,
  LIVE_RADIO_PAGE,
  MEDIA_ARTICLE_PAGE,
  ARTICLE_PAGE,
} from '#app/routes/utils/pageTypes';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import Canonical from './index.canonical';
import Amp from './index.amp';
import styles from './index.styles';

/**
 * EXPECTED DATA SHAPE (from server):
 * navItems: Navigation[]  where each item is:
 * {
 *   title: string;
 *   url: string;             // relative e.g. "/arabic"
 *   hideOnLiteSite?: boolean;
 *   subItems?: Navigation[]; // child items with same shape (title/url/hideOnLiteSite)
 * }
 */

type RenderListItemsArgs = {
  Li: React.ElementType;
  navigation: Navigation[];
  currentPage: string;
  dir: Direction;
  activeIndex: number;
  clickTracker: ReturnType<typeof useClickTrackerHandler>;
  viewTracker?: ReturnType<typeof useViewTracker>;
  // For the top nav: controls whether "current page" is announced to screen
  // readers. True when activeIndex reflects a genuine URL match or a real
  // Watch/Listen category attribution. False when Home is highlighted only as
  // a last-resort default (no match, or categorized Watch/Listen doesn't exist
  // in nav so falls back to Home). The bottom nav only marks items active on
  // genuine URL matches and always announces. The dropdown nav never marks
  // anything active.
  shouldAnnounce?: boolean;
};

const renderListItems = ({
  Li,
  navigation,
  currentPage,
  dir,
  activeIndex,
  clickTracker,
  viewTracker,
  shouldAnnounce = true,
}: RenderListItemsArgs) =>
  navigation.map((item, index) => {
    const { title, url, type } = item;
    const active = index === activeIndex;
    // Only announce "current page" to screen readers when the highlight
    // genuinely reflects the user's location, not when Home is highlighted
    // purely as a last-resort default/fallback categorisation.
    const announceCurrentPage = active && shouldAnnounce;

    return (
      <Li
        key={`${title}-${url}`}
        url={url}
        active={active}
        currentPageText={currentPage}
        announceCurrentPage={announceCurrentPage}
        dir={dir}
        clickTracker={clickTracker}
        {...(viewTracker && { viewTracker })}
      >
        {title}
      </Li>
    );
  });

// this checks if the current pages url matches the navigation item url. We need this to determine which nav item should be active
const matchesUrl = ({
  origin,
  canonicalLink,
  navUrl,
}: {
  origin: string;
  canonicalLink?: string;
  navUrl?: string;
}) => {
  if (!canonicalLink || !navUrl) return false;

  try {
    const canonicalUrl = new URL(canonicalLink, origin);
    const navItemUrl = new URL(navUrl, origin);

    return canonicalUrl.pathname === navItemUrl.pathname;
  } catch (_error) {
    return false;
  }
};

/**
 * Find which top item should be active:
 * - If current page URL matches a top item url -> that index is active
 * - Else if it matches any subItem url -> parent index is active
 * - Else use page-type attribution:
 *   - Video page (tv, liveTV), video mediaArticle, or article with video primaryMediaType -> index 1 (Watch)
 *   - Audio page (audio, liveRadio), audio mediaArticle, or article with audio primaryMediaType -> index 2 (Listen)
 *   - Any other type (non-media article, topic, home, etc.) -> index 0 (Home)
 * Nav items are hopefully always ordered: 0=Home, 1=Watch, 2=Listen, otherwise it won't be possible to know which one to highlight when we aren't matching on url
 * primaryMediaType must be explicitly 'video' or 'audio' to trigger Watch/Listen attribution.
 * Home is the default/fallback for every page that isn't a Watch or Listen match.
 * Returns shouldAnnounce: true when the active index genuinely reflects the
 * user's location - a direct/subItem URL match, or a real Watch/Listen
 * category attribution - false when Home is highlighted only as a
 * last-resort default (no match at all, or the categorised Watch/Listen item
 * doesn't exist in the nav so it falls back to Home). Used to decide whether
 * to announce "current page" to screen readers.
 */
const getActiveTopIndex = ({
  topItems,
  canonicalLink,
  origin,
  pageType,
  primaryMediaType,
}: {
  topItems: Navigation[];
  origin: string;
  canonicalLink?: string;
  pageType?: PageTypes;
  primaryMediaType?: 'audio' | 'video';
}): { index: number; shouldAnnounce: boolean } => {
  if (!topItems?.length) return { index: -1, shouldAnnounce: false };

  // try to find a direct match on the top-level items with the current page URL
  // it returns the index of the first item that matches or -1 if none match
  const directMatchIndex = topItems.findIndex(item =>
    matchesUrl({ canonicalLink, origin, navUrl: item.url }),
  );
  // if a match is found, return the index of the matching top-level item (this is the active item)
  if (directMatchIndex > -1) {
    return { index: directMatchIndex, shouldAnnounce: true };
  }

  // if no direct match in the top level items, check if any of the subItems match the current page URL
  // this is so that if a subItem matches the current page, its parent top-level item will be marked as active in the navigation
  // as the top level navigation has only one link per item, but the bottom navigation can have many,
  // this means that any page categorised under 'Watch' for example,
  // will have the 'Watch' top-level nav item highlighted as active,
  // even if the user is on a page that doesn't directly match the 'Watch' URL
  const parentIndexByChild = topItems.findIndex(parent =>
    (parent.subItems || []).some(child =>
      matchesUrl({ canonicalLink, origin, navUrl: child.url }),
    ),
  );
  if (parentIndexByChild > -1) {
    // Home's subItems are just categorisation (e.g. topic links), not
    // pages that represent "being on the home page" itself, so a subItem
    // match on Home shouldn't announce "current page" - only a direct match
    // on Home's own URL should. Watch/Listen subItem matches (e.g. a video
    // page nested under Watch) do genuinely represent being on that section,
    // so those should still announce.
    return {
      index: parentIndexByChild,
      shouldAnnounce: parentIndexByChild !== 0,
    };
  }

  const watchIndex = topItems.findIndex(item => item.type === 'watch');
  const listenIndex = topItems.findIndex(item => item.type === 'listen');

  // Video pages, video mediaArticles, and article pages with a video primaryMediaType.
  // If there's no Watch item to attribute to, this falls back to highlighting
  // Home as a default categorisation only, so it shouldn't be announced.
  if (
    pageType === TV_PAGE ||
    pageType === LIVE_TV_PAGE ||
    (pageType === MEDIA_ARTICLE_PAGE && primaryMediaType === 'video') ||
    (pageType === ARTICLE_PAGE && primaryMediaType === 'video')
  ) {
    return watchIndex > 1
      ? { index: watchIndex, shouldAnnounce: true }
      : { index: 0, shouldAnnounce: false };
  }

  // Audio pages, audio mediaArticles, and article pages with an audio primaryMediaType
  // If there's no Listen item to attribute to, this falls back to highlighting
  // Home as a default categorisation only, so it shouldn't be announced.
  if (
    pageType === AUDIO_PAGE ||
    pageType === LIVE_RADIO_PAGE ||
    (pageType === MEDIA_ARTICLE_PAGE && primaryMediaType === 'audio') ||
    (pageType === ARTICLE_PAGE && primaryMediaType === 'audio')
  ) {
    return listenIndex > 2
      ? { index: listenIndex, shouldAnnounce: true }
      : { index: 0, shouldAnnounce: false };
  }

  // All other page types (article, topic, home, live, etc.) default to Home (index 0).
  return { index: 0, shouldAnnounce: false };
};

type NavigationContainerProps = {
  navItems?: Navigation[];
  propsForTopBarOJComponent?: {
    blocks?: TopStoryItem[];
  };
  primaryMediaType?: 'audio' | 'video';
};

const navEventTrackingMetadata = { componentName: 'scrollable-navigation' };
const dropdownNavEventTrackingData = { componentName: 'dropdown-navigation' };

const NavigationContainer: React.FC<NavigationContainerProps> = ({
  navItems,
  propsForTopBarOJComponent,
  primaryMediaType,
}) => {
  const { isAmp, isLite, pageType, canonicalLink, origin } =
    use(RequestContext);

  const {
    translations,
    navigation: navFromServiceConfig,
    dir,
  } = use(ServiceContext);

  const { currentPage, navMenuText } = translations;

  const { blocks = [] } = propsForTopBarOJComponent || {};

  const topNavClickTrackerHandler = useClickTrackerHandler(
    navEventTrackingMetadata,
  );
  const bottomNavClickTrackerHandler = useClickTrackerHandler(
    navEventTrackingMetadata,
  );
  const dropdownNavClickTrackerHandler = useClickTrackerHandler(
    dropdownNavEventTrackingData,
  );

  const topNavViewTracker = useViewTracker(navEventTrackingMetadata);
  const dropdownNavViewTracker = useViewTracker(dropdownNavEventTrackingData);

  /**
   * Prefer server-provided navItems; fallback to ServiceContext.navigation if missing.
   */
  const navItemsFromPropsOrServiceConfig = navItems || navFromServiceConfig;

  if (
    !navItemsFromPropsOrServiceConfig ||
    navItemsFromPropsOrServiceConfig.length === 0
  ) {
    return null;
  }

  // For Lite pages, filter out any items that should be hidden on the Lite site
  const navigationItems = navItemsFromPropsOrServiceConfig.filter(
    item => !(item.hideOnLiteSite && isLite),
  );

  // Compute which top item is active based on current URL
  const { index: topActiveIndex, shouldAnnounce: topShouldAnnounce } =
    getActiveTopIndex({
      topItems: navigationItems,
      canonicalLink,
      origin,
      pageType,
      primaryMediaType,
    });

  const topScrollableListItems = (
    <NavigationUl>
      {renderListItems({
        Li: NavigationLi,
        navigation: navigationItems,
        currentPage,
        dir,
        activeIndex: topActiveIndex,
        clickTracker: topNavClickTrackerHandler,
        viewTracker: topNavViewTracker,
        shouldAnnounce: topShouldAnnounce,
      })}
    </NavigationUl>
  );

  /**
   * Build the bottom scrollable nav from the active top item's subItems.
   * If nothing matched, you can choose to show the first group's subItems
   * (useful for non-matching routes) or show an empty list.
   */
  const activeTop =
    topActiveIndex > -1 ? navigationItems[topActiveIndex] : navigationItems[0];

  const bottomItems = activeTop?.subItems || [];

  // Find the active subitem index in the bottom nav
  const activeBottomIndex = bottomItems.findIndex(item =>
    matchesUrl({ canonicalLink, origin, navUrl: item.url }),
  );

  const bottomScrollableListItems = (
    <NavigationUl>
      {renderListItems({
        Li: NavigationLi,
        navigation: bottomItems,
        currentPage,
        dir,
        activeIndex: activeBottomIndex,
        clickTracker: bottomNavClickTrackerHandler,
      })}
    </NavigationUl>
  );

  // Dropdown menu: prioritise the first top-level item and all its subitems
  // CHANGE WHEN HAVE ANSWER TO THE QUESTION ABOUT THIS
  const dropdownSource = (() => {
    if (!navigationItems.length) return [];
    const [first] = navigationItems;
    return [first, ...(first.subItems || [])];
  })();

  const dropdownListItems = (
    <DropdownUl>
      {renderListItems({
        Li: DropdownLi,
        navigation: dropdownSource,
        currentPage,
        dir,
        activeIndex: -1,
        clickTracker: dropdownNavClickTrackerHandler,
        viewTracker: dropdownNavViewTracker,
      })}
    </DropdownUl>
  );

  const NavigationRenderer = isAmp ? Amp : Canonical;

  return (
    <>
      <div css={styles.brandDivider} />
      <NavigationRenderer
        topScrollableListItems={topScrollableListItems}
        bottomScrollableListItems={bottomScrollableListItems}
        dropdownListItems={dropdownListItems}
        menuAnnouncedText={navMenuText}
        dir={dir}
        blocks={blocks}
      />
    </>
  );
};

export default NavigationContainer;
