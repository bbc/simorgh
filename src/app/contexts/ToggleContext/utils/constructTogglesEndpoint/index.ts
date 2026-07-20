import { Services } from '#app/models/types/global';

type Application =
  | 'simorgh'
  | 'amp'
  | 'articles'
  | 'webcore'
  | 'responsive_news';

export default (service: Services, isAmp?: boolean) => {
  const application: Application = isAmp ? 'amp' : 'simorgh';
  const togglesEndpoint = `${process.env.TOGGLES_BFF_PATH}?service=${service}&application=${application}`;

  return togglesEndpoint;
};
