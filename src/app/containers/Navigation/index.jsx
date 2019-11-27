import React, { useContext } from 'react';
import Navigation, {
  NavigationUl,
  NavigationLi,
} from '@bbc/psammead-navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { EventContext } from '#contexts/EventContext';
import { sendEventBeacon } from '../ATIAnalytics/beacon';
import { buildATIClickParams } from '../ATIAnalytics/params';
import { getComponentInfo } from '../../lib/analyticsUtils/index';

const NavigationContainer = () => {
  const { script, translations, navigation, service, dir } = useContext(
    ServiceContext,
  );
  const eventTrackingProps = buildATIClickParams(
    {
      metadata: {
        id: 'id',
        language: 'lang',
      },
    },
    useContext(RequestContext),
    useContext(ServiceContext),
  );
  const { currentPage, skipLinkText } = translations;

  const { useClickTracker } = useContext(EventContext);

  useClickTracker('[data-navigation]', event => {
    const componentName = 'navigation';
    const eventData = event.srcElement.dataset[componentName];
    const componentDataSplit = eventData.split('_');
    const componentData = {
      creationLabel: componentDataSplit[0],
      child: componentDataSplit[1],
    };

    const componentInfo = getComponentInfo({
      result: event.target.href,
      componentName,
      componentData,
    });

    sendEventBeacon({
      componentName,
      type: 'click',
      componentInfo,
      ...eventTrackingProps,
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
