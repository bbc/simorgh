import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Services } from '#app/models/types/global';

type Application =
  | 'simorgh'
  | 'amp'
  | 'articles'
  | 'webcore'
  | 'responsive_news';

export default (service: Services, isAmp?: boolean) => {
  const application: Application = isAmp ? 'amp' : 'simorgh';

  const baseTogglesUrl = `${getEnvConfig().SIMORGH_APP_ENV === 'live' ? process.env.TOGGLES_BFF_PATH : process.env.TOGGLES_TEST_BFF_PATH}`;
  const togglesEndpoint = `${baseTogglesUrl}?service=${service}&application=${application}`;

  return togglesEndpoint;
};
