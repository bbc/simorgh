import { use } from 'react';
import { NavigationUl, NavigationLi } from '#psammead/psammead-navigation/src';
import {
  DropdownUl,
  DropdownLi,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { RequestContext } from '#contexts/RequestContext';
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

const NavigationContainer = ({ navItems, propsForTopBarOJComponent }) => {
  const { isAmp, isLite } = use(RequestContext);

  const { blocks = [] } = propsForTopBarOJComponent || {};
  const {
    translations,
    navigation: navFromServiceConfig,
    dir,
    collapsibleNavigation,
  } = use(ServiceContext);

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
    <DropdownUl role="list">
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
