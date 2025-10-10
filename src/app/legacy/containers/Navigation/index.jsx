import React, { use } from 'react';
import { NavigationUl, NavigationLi } from '#psammead/psammead-navigation/src';
import {
  DropdownUl,
  DropdownLi,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { RequestContext } from '#contexts/RequestContext';
import isLive from '#app/lib/utilities/isLive';
import LanguageNavigation from './LanguageNavigation/lazy';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const renderListItems = (
  Li,
  navigation,
  currentPage,
  dir,
  activeIndex,
  clickTracker,
  viewTracker,
  isLite,
) =>
  navigation.reduce((listAcc, item, index) => {
    const { title, url, hideOnLiteSite } = item;
    const active = index === activeIndex;

    if (hideOnLiteSite && isLite) return listAcc;

    const listItem = (
      <Li
        key={title}
        url={url}
        active={active}
        currentPageText={currentPage}
        dir={dir}
        clickTracker={clickTracker}
        viewTracker={viewTracker}
      >
        {title}
      </Li>
    );

    return [...listAcc, listItem];
  }, []);

const NavigationContainer = ({ propsForTopBarOJComponent }) => {
  const { isAmp, isLite } = use(RequestContext);
  const { blocks = [] } = propsForTopBarOJComponent || {};
  const { translations, navigation, dir, collapsibleNavigation } =
    use(ServiceContext);

  const { canonicalLink, origin } = use(RequestContext);
  const { currentPage, navMenuText } = translations;

  const scrollableNavEventTrackingData = {
    componentName: `scrollable-navigation`,
  };

  const dropdownNavEventTrackingData = {
    componentName: `dropdown-navigation`,
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

  // TODO: isLive statement to be removed when Global Language page goes live. https://bbc.atlassian.net/browse/WS-1254
  const renderLanguageNavigation = !isLive() && collapsibleNavigation?.length;

  if (renderLanguageNavigation) {
    return <LanguageNavigation />;
  }

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
        currentPage,
        dir,
        activeIndex,
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
        currentPage,
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
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      menuAnnouncedText={navMenuText}
      dir={dir}
      blocks={blocks}
    />
  );
};

export default NavigationContainer;
