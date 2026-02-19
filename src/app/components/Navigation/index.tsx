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
import { Direction, PageTypes, Services } from '#app/models/types/global';
import Canonical from './index.canonical';
import Amp from './index.amp';
import type { NavigationItem, NavigationContainerProps } from './types';

const getTopItemA11yProps = ({
  item,
  index,
  active,
  pageType,
}: {
  item: NavigationItem;
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
 * navItems: NavigationItem[]  where each item is:
 * {
 *   title: string;
 *   url: string;             // relative e.g. "/arabic"
 *   hideOnLiteSite?: boolean;
 *   subItems?: NavigationItem[]; // child items with same shape (title/url/hideOnLiteSite)
 * }
 */

type RenderListItemsArgs = {
  Li: React.ElementType;
  navigation: NavigationItem[];
  currentPage: string;
  service: Services;
  dir: Direction;
  activeIndex: number;
  clickTracker: unknown;
  viewTracker: unknown;
  isLite?: boolean;
  navType?: string;
  pageType?: PageTypes;
};

const renderListItems = ({
  Li,
  navigation,
  currentPage,
  service,
  dir,
  activeIndex,
  clickTracker,
  viewTracker,
  isLite,
  navType,
  pageType,
}: RenderListItemsArgs) =>
  navigation.reduce<React.ReactNode[]>((listAcc, item, index) => {
    const { title, url, hideOnLiteSite } = item;
    const active = index === activeIndex;
    const a11yProps =
      getTopItemA11yProps({ item, index, active, pageType }) ?? {};

    if (hideOnLiteSite && isLite) return listAcc;

    const listItem = (
      <Li
        key={`${title}-${url}`}
        url={url}
        active={active}
        currentPageText={currentPage}
        service={service}
        dir={dir}
        clickTracker={clickTracker}
        viewTracker={viewTracker}
        navType={navType}
        {...a11yProps}
      >
        {title}
      </Li>
    );

    return [...listAcc, listItem];
  }, []);

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
  topItems: NavigationItem[];
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

const NavigationContainer: React.FC<NavigationContainerProps> = ({
  navItems,
  propsForTopBarOJComponent,
}) => {
  const { isAmp, isLite, pageType, canonicalLink, origin } =
    use(RequestContext);

  const { blocks = [] } = propsForTopBarOJComponent || {};

  const {
    translations,
    navigation: navFromServiceConfig,
    service,
    dir,
  } = use(ServiceContext);
  const { currentPage, navMenuText } = translations;

  /**
   * Prefer server-provided navItems; fallback to ServiceContext.navigation if missing.
   */
  const navigationItems = navItems || navFromServiceConfig;

  const scrollableNavEventTrackingData = {
    componentName: `scrollable-navigation`,
  };

  const topNavEventTrackingData = {
    componentName: `top-navigation`,
  };

  const dropdownNavEventTrackingData = { componentName: `dropdown-navigation` };

  const scrollableNavClickTrackerHandler = useClickTrackerHandler(
    scrollableNavEventTrackingData,
  );

  const topNavClickTrackerHandler = useClickTrackerHandler(
    topNavEventTrackingData,
  );

  const dropdownNavClickTrackerHandler = useClickTrackerHandler(
    dropdownNavEventTrackingData,
  );

  const scrollableNavViewTracker = useViewTracker(
    scrollableNavEventTrackingData,
  );

  const topNavViewTracker = useViewTracker(topNavEventTrackingData);

  const dropdownNavViewTracker = useViewTracker(dropdownNavEventTrackingData);

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
        service,
        dir,
        activeIndex: topActiveIndex,
        clickTracker: topNavClickTrackerHandler,
        viewTracker: topNavViewTracker,
        isLite,
        navType: 'top',
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

  const scrollableListItems = (
    <NavigationUl>
      {renderListItems({
        Li: NavigationLi,
        navigation: bottomItems,
        currentPage,
        service,
        dir,
        activeIndex: activeBottomIndex,
        clickTracker: scrollableNavClickTrackerHandler,
        viewTracker: scrollableNavViewTracker,
        isLite,
        pageType,
      })}
    </NavigationUl>
  );

  // Dropdown menu: prioritise the first top-level item and all its subitems
  // CHANGE WHEN HAVE ANSWER TO THE QUESTION ABOUT THIS
  const dropdownSource = (() => {
    if (!navigationItems.length) return [];
    const [first, ..._] = navigationItems;
    return [first, ...(first.subItems || [])];
  })();

  const dropdownListItems = (
    <DropdownUl>
      {renderListItems({
        Li: DropdownLi,
        navigation: dropdownSource,
        currentPage,
        service,
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
    <NavigationRenderer
      topScrollableListItems={topScrollableListItems}
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      menuAnnouncedText={navMenuText}
      dir={dir}
      service={service}
      blocks={blocks}
    />
  );
};

export default NavigationContainer;
