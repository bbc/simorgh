import { Services } from '#app/models/types/global';
import { PortraitVideoPageData } from './types';

type PortraitVideoPageModule = {
  default: PortraitVideoPageData;
};

const isMissingServiceConfig = (error: unknown, service: Services) =>
  typeof error === 'object' &&
  error !== null &&
  'message' in error &&
  typeof error.message === 'string' &&
  error.message.includes(`Cannot find module './${service}'`);

export const getPortraitVideoPageData = async (service: Services) => {
  try {
    const { default: pageData } = (await import(
      `./${service}`
    )) as PortraitVideoPageModule;

    return pageData;
  } catch (error) {
    if (isMissingServiceConfig(error, service)) return undefined;

    throw error;
  }
};

export type { PortraitVideoArticle, PortraitVideoPageData } from './types';
