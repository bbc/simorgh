import React, { useContext } from 'react';
import { NavigationUl, NavigationLi } from '@bbc/psammead-navigation';
import { DropdownUl, DropdownLi } from '@bbc/psammead-navigation/dropdown';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
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
) =>
  navigation.map((item, index) => {
    const { title, url } = item;
    const active = index === activeIndex;

    return (
      <Li
        key={title}
        url={url}
        script={script}
        active={active}
        currentPageText={currentPage}
        service={service}
        dir={dir}
      >
        {title}
      </Li>
    );
  });

const NavigationContainer = () => {
  const { isAmp } = useContext(RequestContext);

  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );

  const { canonicalLink, origin } = useContext(RequestContext);
  const { currentPage, navMenuText } = translations;

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
    />
  );
};

export default NavigationContainer;
