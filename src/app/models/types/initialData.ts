import { GetAgent } from './fetch';
import { PageTypes, Services, Toggles, Variants } from './global';

export type InitialDataProps = {
  service: Services;
  path: string;
  pageType: PageTypes;
  variant?: Variants;
  toggles?: Toggles;
  getAgent?: GetAgent;
};
