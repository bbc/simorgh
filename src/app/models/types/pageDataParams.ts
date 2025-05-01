import { ParsedUrlQuery } from 'querystring';
import { PageTypes, Services } from './global';

export default interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  service: Services;
  variant?: string[];
  // eslint-disable-next-line camelcase
  renderer_env?: string;
  resolvedUrl: string;
  pageType: PageTypes;
}
