import { ParsedUrlQuery } from 'querystring';
import { Services, Variants } from './global';

export default interface PageDataParams extends ParsedUrlQuery {
  id: string;
  page?: string;
  post?: string;
  service: Services;
  variant?: Variants;
  // eslint-disable-next-line camelcase
  renderer_env?: string;
  resolvedUrl: string;
}
