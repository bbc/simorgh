import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Services } from '#app/models/types/global';

type Application =
  | 'simorgh'
  | 'amp'
  | 'articles'
  | 'webcore'
  | 'responsive_news';

export default (service: Services, isAmp?: boolean) => {
  console.log(
    '[constructTogglesEndpoint] received service:',
    service,
    '| isAmp:',
    isAmp,
    '| TOGGLES_BFF_PATH:',
    process.env.TOGGLES_BFF_PATH,
  );
  const application: Application = isAmp ? 'amp' : 'simorgh';
  const { WEB_CDN_URL } = getEnvConfig();
  const togglesUrl = isAmp
    ? `${WEB_CDN_URL}/fd/ws-toggles`
    : (process.env.TOGGLES_BFF_PATH as string);

  const togglesEndpoint = new URL(togglesUrl);
  togglesEndpoint.searchParams.set('service', service);
  togglesEndpoint.searchParams.set('application', application);

  const endpoint = togglesEndpoint.toString();
  console.log('[constructTogglesEndpoint] constructed URL:', endpoint);

  return endpoint;
};
