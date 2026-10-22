import { Services } from '#app/models/types/global';
import hausa from './hausa';
import { PortraitVideoPageData } from './types';

const portraitVideoPages: Partial<Record<Services, PortraitVideoPageData>> = {
  hausa,
};

export const getPortraitVideoPageData = (service: Services) =>
  portraitVideoPages[service];

export type { PortraitVideoArticle, PortraitVideoPageData } from './types';
