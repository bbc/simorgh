import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { Services } from '#app/models/types/global';

export default (service: Services, origin: string | null) => {
  const requestOrigin = origin || 'https://www.test.bbc.com';
  const baseTogglesUrl = `${
    getEnvConfig().SIMORGH_CONFIG_URL
  }?application=simorgh&service=${service}&__amp_source_origin=${requestOrigin}`; // __amp_source_origin is relevant to both canonical and amp

  return baseTogglesUrl;
};
