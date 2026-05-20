import type { ReverbDetailsProviders } from '../types';
import { buildPageReverbParams } from './buildParams';

export default ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) =>
  buildPageReverbParams({ atiData, requestContext, serviceContext });
