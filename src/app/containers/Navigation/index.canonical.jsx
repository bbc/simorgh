import React, { useContext } from 'react';
import Navigation, {
  NavigationUl,
  NavigationLi,
} from '@bbc/psammead-navigation';
import { CanonicalScrollableNavigation } from '@bbc/psammead-navigation/scrollable';
import { ServiceContext } from '#contexts/ServiceContext';

const CanonicalNavigationContainer = () => {
  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );

  const { currentPage, skipLinkText } = translations;

  if (!navigation || navigation.length === 0) {
    return null;
  }

  return (
    <Navigation
      script={script}
      skipLinkText={skipLinkText}
      service={service}
      dir={dir}
    >
      <CanonicalScrollableNavigation dir={dir}>
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
              >
                {title}
              </NavigationLi>
            );
          })}
        </NavigationUl>
      </CanonicalScrollableNavigation>
    </Navigation>
  );
};

export default CanonicalNavigationContainer;
