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
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import Canonical from './index.canonical';
import Amp from './index.amp';
import styles from './index.styles';

const getTopItemA11yProps = ({
  item,
  index,
  active,
  pageType,
}: {
  item: Navigation;
  index: number;
  active: boolean;
  pageType?: PageTypes;
}) => {
  const shouldAnnounceCurrentPage =
    pageType === 'home' && active && index === 0;

  if (!active || shouldAnnounceCurrentPage) {
    return {};
  }

  return {
    'aria-current': undefined,
    'aria-label': item.title,
    'aria-labelledby': undefined,
  };
};

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
  clickTracker: unknown;
  viewTracker: unknown;
  isLite?: boolean;
  pageType?: PageTypes;
};

const renderListItems = ({
  Li,
  navigation,
  currentPage,
  dir,
  activeIndex,
  clickTracker,
  viewTracker,
  isLite,
  pageType,
}: RenderListItemsArgs) =>
  navigation
    // For Lite pages, filter out any items that should be hidden on the Lite site
    .filter(item => !(item.hideOnLiteSite && isLite))
    .map((item, index) => {
      const { title, url } = item;
      const active = index === activeIndex;
      const a11yProps =
        getTopItemA11yProps({ item, index, active, pageType }) ?? {};

      return (
        <Li
          key={`${title}-${url}`}
          url={url}
          active={active}
          currentPageText={currentPage}
          dir={dir}
          clickTracker={clickTracker}
          viewTracker={viewTracker}
          {...a11yProps}
        >
          {title}
        </Li>
      );
    });

// this checks if the current pages url matches the navigation item url. We need this to determine which nav item should be active
const matchesUrl = (
  canonicalLink: string | undefined,
  origin: string,
  navUrl?: string,
) => {
  if (!canonicalLink || !navUrl) return false;
  const absolute = `${origin}${navUrl}`;
  return canonicalLink === absolute;
};

/**
 * Find which top item should be active:
 * - If current page matches a top item url -> that index is active
 * - Else if it matches any subItem url -> parent index is active
 * - Else if pageType === 'home' -> 0
 * - Else -> -1 (no active)
 */
const getActiveTopIndex = ({
  topItems,
  canonicalLink,
  origin,
  pageType,
}: {
  topItems: Navigation[];
  canonicalLink?: string;
  origin: string;
  pageType?: PageTypes;
}) => {
  if (!topItems?.length) return -1;

  // try to find a direct match on the top-level items with the current page URL
  // it returns the index of the first item that matches or -1 if none match
  const directMatchIndex = topItems.findIndex(item =>
    matchesUrl(canonicalLink, origin, item.url),
  );
  // if a match is found, return the index of the matching top-level item (this is the active item)
  if (directMatchIndex > -1) return directMatchIndex;

  // if no direct match in the top level items, check if any of the subItems match the current page URL
  // this is so that if a subItem matches the current page, its parent top-level item will be marked as active in the navigation
  // as the top level navigation has only one link per item, but the bottom navigation can have many,
  // this means that any page categorised under 'Watch' for example,
  // will have the 'Watch' top-level nav item highlighted as active,
  // even if the user is on a page that doesn't directly match the 'Watch' URL
  const parentIndexByChild = topItems.findIndex(parent =>
    (parent.subItems || []).some(child =>
      matchesUrl(canonicalLink, origin, child.url),
    ),
  );
  if (parentIndexByChild > -1) return parentIndexByChild;

  // We always want the first top level nav item to be active on the home page,
  // and the first nav item should always be 'Home'
  if (pageType === 'home') return 0;

  return -1;
};

type NavigationContainerProps = {
  navItems: Navigation[];
  propsForTopBarOJComponent?: {
    blocks?: TopStoryItem[];
  };
};

const NavigationContainer: React.FC<NavigationContainerProps> = ({
  navItems,
  propsForTopBarOJComponent,
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

  const navEventTrackingMetadata = { componentName: 'scrollable-navigation' };
  const dropdownNavEventTrackingData = { componentName: 'dropdown-navigation' };

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
  const bottomNavViewTracker = useViewTracker(navEventTrackingMetadata);
  const dropdownNavViewTracker = useViewTracker(dropdownNavEventTrackingData);

  /**
   * Prefer server-provided navItems; fallback to ServiceContext.navigation if missing.
   */
  const navigationItems = navItems || navFromServiceConfig;

  if (!navigationItems || navigationItems.length === 0) {
    return null;
  }

  // Compute which top item is active based on current URL
  const topActiveIndex = getActiveTopIndex({
    topItems: navigationItems,
    canonicalLink,
    origin,
    pageType,
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
        isLite,
        pageType,
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
    matchesUrl(canonicalLink, origin, item.url),
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
        viewTracker: bottomNavViewTracker,
        isLite,
        pageType,
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
        pageType,
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
