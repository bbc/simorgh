import React, { useContext } from 'react';
import Navigation, {
  NavigationUl,
  NavigationLi,
} from '@bbc/psammead-navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const NavigationContainer = () => {
  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );

  const { currentPage, skipLinkText } = translations;

  // debugging navigation - to be removed
  logger.info(`Navigation: ${JSON.stringify(navigation)}`);

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
    </Navigation>
  );
};

export default NavigationContainer;
