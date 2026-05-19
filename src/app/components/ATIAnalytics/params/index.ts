import { buildPageReverbParams } from './buildParams';
import type { ReverbDetailsProviders } from '../types';

export default ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) => {
  return buildPageReverbParams({ atiData, requestContext, serviceContext });
};
