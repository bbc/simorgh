import { Services } from '#app/models/types/global';

type Application =
  | 'simorgh'
  | 'amp'
  | 'articles'
  | 'webcore'
  | 'responsive_news';

type ConstructTogglesEndpointParams = {
  service: Services;
  isAmp?: boolean;
  overrideEndpoint?: string;
};

export default ({
  service,
  isAmp = false,
  overrideEndpoint,
}: ConstructTogglesEndpointParams) => {
  const application: Application = isAmp ? 'amp' : 'simorgh';
  const togglesUrl =
    overrideEndpoint || (process.env.TOGGLES_BFF_PATH as string);

  const togglesEndpoint = new URL(togglesUrl);
  togglesEndpoint.searchParams.set('service', service);
  togglesEndpoint.searchParams.set('application', application);

  const endpoint = togglesEndpoint.toString();

  return endpoint;
};
