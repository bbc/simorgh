import { Tag } from '#app/components/Metadata/types';
import { Services } from '#app/models/types/global';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const IFRAME_BASE_URL = getEnvConfig().SIMORGH_INCLUDES_BASE_URL;

export type ElectionBannerServices = Extract<Services, 'hindi'>;

export const BANNER_CONFIG: Record<
  ElectionBannerServices,
  { iframeSrc: string; height: number; thingLabel: Tag['thingLabel'] }
> = {
  hindi: {
    iframeSrc: `${IFRAME_BASE_URL}/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed`,
    height: 520,
    thingLabel: 'लोकसभा चुनाव 2024',
  },
};
