import { useEffect, useRef, useContext, useState } from 'react';
import { sendEventBeacon } from '#containers/ATIAnalytics/beacon/index';
import { getComponentInfo } from '#app/lib/analyticsUtils/index';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { buildATIClickParams } from '#containers/ATIAnalytics/params';
import pageData from './fixtureData.json';
import pidginData from './fixtureData/sport-23252855.json';
import zhongwenDataSimp from './fixtureData/chinese-news-49065935-simp.json';
import zhongwenDataTrad from './fixtureData/chinese-news-49065935-trad.json';

// May need to add pageData as a prop
const useClickTracker = ({ componentName }) => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const requestContext = useContext(RequestContext);
  const serviceContext = useContext(ServiceContext);
  const { service } = serviceContext;
  const clickRef = useRef(null);

  const eventTrackingProps = buildATIClickParams(
    zhongwenDataTrad,
    requestContext,
    serviceContext,
  );

  // Create click type utility and ignore double click if click is unmodified double click etc
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = event => {
    // eslint-disable-next-line no-console
    console.log(`${componentName} Clicked!`);

    if (!hasBeenClicked) {
      setHasBeenClicked(true);
      const componentInfo = getComponentInfo({
        result: event.target.href || window.location.href,
        componentName,
        componentData: {
          actionLabel: 'click',
          child: event.target.tagName,
        },
      });

      sendEventBeacon({
        type: 'click',
        componentName,
        service,
        variant: requestContext.variant || '',
        componentInfo,
        ...eventTrackingProps,
      }).then(() => {
        // eslint-disable-next-line no-console
        console.log('Sent!');
      });
    }
  };

  useEffect(() => {
    const trackedComponent = clickRef.current;
    trackedComponent?.addEventListener('click', handleClick); // Does 'click' cover enter keypress all the time?

    return () => trackedComponent?.removeEventListener('click', handleClick);
  }, [handleClick]);

  return clickRef;
};

export default useClickTracker;
