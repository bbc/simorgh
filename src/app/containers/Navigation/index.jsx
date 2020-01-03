import React, { useContext } from 'react';
import { NavigationUl, NavigationLi } from '@bbc/psammead-navigation';
import { DropdownUl, DropdownLi } from '@bbc/psammead-navigation/dropdown';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import Canonical from './index.canonical';
import Amp from './index.amp';

const renderListItems = (Li, navigation, script, currentPage, service, dir) =>
  navigation.map((item, index) => {
    const { title, url } = item;
    const active = index === 0;

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
  const { platform } = useContext(RequestContext);
  const isAmp = platform === 'amp';

  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );
  const { currentPage, sections } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  const scrollableListItems = (
    <NavigationUl>
      {renderListItems(
        NavigationLi,
        navigation,
        script,
        currentPage,
        service,
        dir,
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
      )}
    </DropdownUl>
  );

  const Navigation = isAmp ? Amp : Canonical;

  return (
    <Navigation
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      menuAnnouncedText={sections}
      dir={dir}
      script={script}
      service={service}
    />
  );
};

export default NavigationContainer;
