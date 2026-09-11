import { Services } from '#app/models/types/global';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

type ConstructTogglesEndpointParams = {
  service: Services;
  isAmp?: boolean;
};

export default ({ service, isAmp = false }: ConstructTogglesEndpointParams) => {
  const togglesUrl = isAmp
    ? `${getEnvConfig().WEB_CDN_URL}/fd/ws-toggles`
    : (process.env.TOGGLES_BFF_PATH as string);

  const togglesEndpoint = new URL(togglesUrl);
  togglesEndpoint.searchParams.set('service', service);
  togglesEndpoint.searchParams.set('application', 'simorgh');

  return togglesEndpoint.toString();
};
