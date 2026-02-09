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
import LanguageNavigation from './LanguageNavigation/lazy';
import Canonical from './index.canonical';
import Amp from './index.amp';
import { NavigationItem, NavigationContainerProps } from './types';
import TopLevelNav from './TopLevelNav';

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
  navigation.reduce((listAcc, item, index) => {
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
  }, [] as React.ReactNode[]);

const NavigationContainer = ({
  navItems,
  propsForTopBarOJComponent,
}: NavigationContainerProps) => {
  const { isAmp, isLite } = use(RequestContext);
  const { blocks = [] } = propsForTopBarOJComponent || {};
  const {
    script,
    translations,
    navigation: navFromServiceConfig = [],
    service,
    dir,
    collapsibleNavigation,
  } = use(ServiceContext);

  const { canonicalLink, origin } = use(RequestContext);
  const { currentPage, navMenuText } = translations;

  const scrollableNavEventTrackingData = {
    componentName: 'scrollable-navigation',
  };

  const dropdownNavEventTrackingData = {
    componentName: 'dropdown-navigation',
  };

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

  const renderLanguageNavigation = collapsibleNavigation?.length;

  if (renderLanguageNavigation) {
    return <LanguageNavigation />;
  }

  // Prefer navItems passed from props over service config
  // Eventually all services will migrate to passing navItems via props
  const navigation = navItems || navFromServiceConfig;
  if (!navigation || navigation.length === 0) {
    return null;
  }

  const activeIndex = navigation.findIndex(
    link => `${origin}${link.url}` === canonicalLink,
  );

  const scrollableListItems = (
    <NavigationUl>
      {renderListItems(
        NavigationLi,
        navigation,
        script,
        currentPage,
        service,
        dir,
        activeIndex,
        scrollableNavClickTrackerHandler,
        scrollableNavViewTracker,
        isLite,
      )}
    </NavigationUl>
  );

  const dropdownListItems = (
    <DropdownUl role="list">
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
        isLite,
      )}
    </DropdownUl>
  );

  const Navigation = isAmp ? Amp : Canonical;

  // --- Render TopLevelNav above the main navigation list ---
  return (
    <>
      <div css={{ marginBottom: '1rem', fontWeight: 'bold' }}>
        Navigation test: This is showing on the page.
      </div>
      <TopLevelNav dropdownList={dropdownListItems} dir={dir} />
      <Navigation
        scrollableListItems={scrollableListItems}
        dropdownListItems={null}
        menuAnnouncedText={navMenuText}
        dir={dir}
        script={script}
        service={service}
        blocks={blocks}
      />
    </>
  );
};

export default NavigationContainer;
