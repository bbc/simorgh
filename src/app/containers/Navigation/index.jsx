import React, { useContext } from 'react';
import { NavigationUl, NavigationLi } from '@bbc/psammead-navigation';
import {
  Dropdown,
  DropdownUl,
  DropdownLi,
} from '@bbc/psammead-navigation/dropdown';
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

  const {
    script,
    translations,
    navigation,
    service,
    dir,
    navigationSection,
  } = useContext(ServiceContext);
  const { currentPage, skipLinkText } = translations;

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
    <Dropdown>
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
    </Dropdown>
  );

  const Navigation = isAmp ? Amp : Canonical;

  return (
    <Navigation
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      menuAnnouncedText={navigationSection}
      dir={dir}
      script={script}
      service={service}
    />
  );
};

export default NavigationContainer;
