import { ComponentType, use } from 'react';
import {
  createInstance,
  OptimizelyProvider,
  setLogger,
} from '@optimizely/react-sdk';
import isLive from '#lib/utilities/isLive';
import onClient from '#lib/utilities/onClient';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '#psammead/gel-foundations/src/breakpoints';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import Cookie from 'js-cookie';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import isCypress from './isCypress';

const isInCypress = isCypress();
const isStoryBook = process.env.STORYBOOK;
const disableOptimizely = isStoryBook || isInCypress;

if (isLive() || isInCypress) {
  setLogger(null);
}

const getUserId = () => {
  if (disableOptimizely || !onClient() || isOperaProxy()) return null;

  return Cookie.get('ckns_mvt') ?? null;
};

const isMobile = () => {
  if (onClient()) {
    const matchMedia = window.matchMedia(
      `(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`,
    );

    if (matchMedia.matches) return true;

    return false;
  }

  return false;
};

const optimizely = createInstance({
  sdkKey: getEnvConfig().SIMORGH_OPTIMIZELY_SDK_KEY,
  eventBatchSize: 10,
  eventFlushInterval: 1000,
});

const withOptimizelyProvider = <T,>(Component: ComponentType<T>) => {
  return props => {
    if (disableOptimizely) return <Component {...props} />;

    const { service } = use(ServiceContext);
    const { country, referrer } = use(RequestContext);
    console.log('Referrer in withOptimizelyProvider:', referrer);
    return (
      <OptimizelyProvider
        optimizely={optimizely}
        isServerSide
        timeout={1000}
        user={{
          id: getUserId(),
          attributes: {
            service,
            mobile: isMobile(),
            referrer: referrer ?? null,
            country: country ?? null,
          },
        }}
      >
        <Component {...props} />
      </OptimizelyProvider>
    );
  };
};

export default withOptimizelyProvider;
