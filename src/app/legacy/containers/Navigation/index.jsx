import { use } from 'react';
import { NavigationUl, NavigationLi } from '#psammead/psammead-navigation/src';
import {
  DropdownUl,
  DropdownLi,
} from '#psammead/psammead-navigation/src/DropdownNavigation';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import { RequestContext } from '#contexts/RequestContext';
import isLiveTVNavItem from '#lib/utilities/navigation/isLiveTVNavItem';
import LanguageNavigation from './LanguageNavigation/lazy';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const renderListItems = (
  Li,
  navigation,
  script,
  currentPage,
  service,
  dir,
  activeIndex,
  clickTracker,
  viewTracker,
  isLite,
  liveTVChannelIdentifier,
) =>
  navigation.reduce((listAcc, item, index) => {
    const { title, url, hideOnLiteSite } = item;
    const active = index === activeIndex;

    if (hideOnLiteSite && isLite) return listAcc;

    const showLivePulse = isLiveTVNavItem({
      navItemUrl: url,
      liveTVChannelIdentifier,
    });

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
        showLivePulse={showLivePulse}
      >
        {title}
      </Li>
    );

    return [...listAcc, listItem];
  }, []);

const NavigationContainer = ({ propsForTopBarOJComponent }) => {
  const { isAmp, isLite } = use(RequestContext);
  const { blocks = [] } = propsForTopBarOJComponent || {};
  const {
    script,
    translations,
    navigation,
    service,
    dir,
    collapsibleNavigation,
    liveTVChannelIdentifier,
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
        liveTVChannelIdentifier,
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
        isLite, // this took me ages to work out
        liveTVChannelIdentifier,
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
      script={script}
      service={service}
      blocks={blocks}
    />
  );
};

export default NavigationContainer;
