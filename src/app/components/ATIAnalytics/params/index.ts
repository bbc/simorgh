import { buildPageReverbParams } from './buildParams';
import type { ReverbDetailsProviders } from '../types';

export default ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) =>
  buildPageReverbParams({ atiData, requestContext, serviceContext });
