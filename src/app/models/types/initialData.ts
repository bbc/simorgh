import type { GetAgent } from './fetch';
import type { PageTypes, Services, Toggles, Variants } from './global';

export type InitialDataProps = {
  service: Services;
  path: string;
  pageType: PageTypes;
  variant?: Variants;
  toggles?: Toggles;
  getAgent?: GetAgent;
};
