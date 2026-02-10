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
import Canonical from './index.canonical';
import Amp from './index.amp';
import type { NavigationItem, NavigationContainerProps } from './types';

const renderListItems = (
  Li: React.ElementType,
  navigation: NavigationItem[],
  script: unknown,
  currentPage: string,
  service: string,
  dir: string,
  activeIndex: number,
  clickTracker: unknown,
  viewTracker: unknown,
  isLite?: boolean,
) =>
  navigation.reduce<React.ReactNode[]>((listAcc, item, index) => {
    const { title, url, hideOnLiteSite } = item;
    const active = index === activeIndex;

    if (hideOnLiteSite && isLite) return listAcc;

    const listItem = (
      <Li
        key={title}
        url={url}
        script={script}
        active={active}
        currentPageText={currentPage}
        service={service}
        dir={dir}
        clickTracker={clickTracker}
        viewTracker={viewTracker}
      >
        {title}
      </Li>
    );

    return [...listAcc, listItem];
  }, []);

const getTopNavLinks = (navigation: NavigationItem[]): NavigationItem[] => [
  {
    title: navigation?.[0]?.title || 'Home',
    url: 'https://www.bbc.com/arabic',
  },
  { title: 'Watch', url: 'https://www.bbc.com/arabic/topics/crgyknwdlwnt' },
  { title: 'Listen', url: 'https://www.bbc.com/arabic/topics/cljddp5lw0dt' },
];

const NavigationContainer: React.FC<NavigationContainerProps> = ({
  propsForTopBarOJComponent,
}) => {
  const { isAmp, isLite, pageType } = use(RequestContext);
  console.log('pageType', pageType);
  const { blocks = [] } = propsForTopBarOJComponent || {};
  const { script, translations, navigation, service, dir } =
    use(ServiceContext);
  const { canonicalLink, origin } = use(RequestContext);
  const { currentPage, navMenuText } = translations;

  const scrollableNavEventTrackingData = {
    componentName: `scrollable-navigation`,
  };
  const dropdownNavEventTrackingData = { componentName: `dropdown-navigation` };

  const scrollableNavClickTrackerHandler = useClickTrackerHandler(
    scrollableNavEventTrackingData,
  );
  const dropdownNavClickTrackerHandler = useClickTrackerHandler(
    dropdownNavEventTrackingData,
  );
  const scrollableNavViewTracker = useViewTracker(
    scrollableNavEventTrackingData,
  );
  const dropdownNavViewTracker = useViewTracker(dropdownNavEventTrackingData);

  if (!navigation || navigation.length === 0) {
    return null;
  }

  const activeIndex = navigation.findIndex(
    link => `${origin}${link.url}` === canonicalLink,
  );

  // Top scrollable nav (static links)
  const topNavLinks = getTopNavLinks(navigation);
  // Set activeIndex to 0 only if pageType is 'home', otherwise -1 (no active)
  const topActiveIndex = pageType === 'home' ? 0 : -1;

  const topScrollableListItems = (
    <NavigationUl>
      {renderListItems(
        NavigationLi,
        topNavLinks,
        script,
        currentPage,
        service,
        dir,
        topActiveIndex,
        undefined,
        undefined,
        isLite,
      )}
    </NavigationUl>
  );

  // Remove the first item (Home) from the main navigation list
  const mainNavLinks = navigation.slice(1);
  const mainActiveIndex = activeIndex > 0 ? activeIndex - 1 : -1;
  // Main scrollable nav (dynamic)
  const scrollableListItems = (
    <NavigationUl>
      {renderListItems(
        NavigationLi,
        mainNavLinks,
        script,
        currentPage,
        service,
        dir,
        mainActiveIndex,
        scrollableNavClickTrackerHandler,
        scrollableNavViewTracker,
        isLite,
      )}
    </NavigationUl>
  );

  const dropdownListItems = (
    <DropdownUl>
      {renderListItems(
        DropdownLi,
        navigation,
        script,
        currentPage,
        service,
        dir,
        activeIndex,
        dropdownNavClickTrackerHandler,
        dropdownNavViewTracker,
      )}
    </DropdownUl>
  );

  const Navigation = isAmp ? Amp : Canonical;

  return (
    <Navigation
      topScrollableListItems={topScrollableListItems}
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      menuAnnouncedText={navMenuText}
      dir={dir}
      script={script}
      service={service}
      blocks={blocks}
    />
  );
};

export default NavigationContainer;
