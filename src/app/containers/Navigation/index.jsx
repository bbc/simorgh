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

const Navigation = () => {
  const { platform } = useContext(RequestContext);
  const isAmp = platform === 'amp';

  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );
  const { currentPage, skipLinkText, sections } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  const scrollableListItems = (
    <NavigationUl>
      {navigation.map((item, index) => {
        const { title, url } = item;
        const active = index === 0;

        return (
          <NavigationLi
            key={title}
            url={url}
            script={script}
            active={active}
            currentPageText={currentPage}
            service={service}
            dir={dir}
          >
            {title}
          </NavigationLi>
        );
      })}
    </NavigationUl>
  );

  const dropdownId = 'dropdown-menu';
  const dropdownListItems = (
    // Hidden attribute is added if we're on amp because the amp toggleVisibility
    // only works by adding and removing the hidden attribute on the target.
    // Canonical on the other hand either renders or doesn't render the component
    // so adding the hidden attribute would always hide it!
    <Dropdown id={dropdownId} hidden={isAmp}>
      <DropdownUl>
        {navigation.map((item, index) => {
          const { title, url } = item;
          const active = index === 0;

          return (
            <DropdownLi
              key={title}
              url={url}
              script={script}
              active={active}
              currentPageText={currentPage}
              service={service}
              dir={dir}
            >
              {title}
            </DropdownLi>
          );
        })}
      </DropdownUl>
    </Dropdown>
  );

  return isAmp ? (
    <Amp
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      menuAnnouncedText={sections}
      dir={dir}
      script={script}
      service={service}
      dropdownId={dropdownId}
    />
  ) : (
    <Canonical
      scrollableListItems={scrollableListItems}
      dropdownListItems={dropdownListItems}
      skipLinkText={skipLinkText}
      menuAnnouncedText={sections}
      dir={dir}
      script={script}
      service={service}
    />
  );
};

export default Navigation;
