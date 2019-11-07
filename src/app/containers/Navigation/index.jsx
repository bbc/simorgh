import React, { useContext } from 'react';
import Navigation, {
  NavigationUl,
  NavigationLi,
} from '@bbc/psammead-navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { EventContext } from '#contexts/EventContext';
import { sendEventBeacon } from '../ATIAnalytics/beacon';

const NavigationContainer = () => {
  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );
  const { platform, statsDestination } = useContext(RequestContext);

  const { currentPage, skipLinkText } = translations;

  const { useClickTracker } = useContext(EventContext);

  useClickTracker('[data-navigation]', event => {
    const componentName = 'navigation';
    const eventData = event.srcElement.dataset[componentName];
    const eventTrackingProps = {
      service,
      statsDestination,
      platform,
      pageIdentifier: `${service}.page`,
    };

    sendEventBeacon({
      ...eventTrackingProps,
      element: event.target,
      componentName,
      type: 'click',
      componentInfo: `${componentName}-${eventData}`,
    });
  });

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
              data-navigation={`${title.split(' ').join('-')}_${index}`}
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
