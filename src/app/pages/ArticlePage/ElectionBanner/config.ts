import { Tag } from '#app/components/Metadata/types';
import { Services } from '#app/models/types/global';

export type ElectionBannerServices = Extract<Services, 'hindi'>;

export const BANNER_CONFIG: Record<
  ElectionBannerServices,
  { iframeSrc: string; height: number; thingLabel: Tag['thingLabel'] }
> = {
  hindi: {
    iframeSrc:
      'https://news.test.files.bbci.co.uk/include/vjsthasia/2308-india-elections-2024-results-page/develop/english/election-banner/embed',
    height: 475,
    thingLabel: 'लोकसभा चुनाव 2024',
  },
};
