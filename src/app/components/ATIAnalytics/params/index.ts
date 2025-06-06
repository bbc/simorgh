import {
  buildPageATIUrl,
  buildPageATIParams,
  buildPageReverbParams,
} from './buildParams';
import { sanitizeUrl } from '../../../lib/analyticsUtils';
import {
  ATIConfigurationDetailsProviders,
  ReverbDetailsProviders,
} from '../types';

export const buildATIUrl = ({
  requestContext,
  serviceContext,
  atiData,
}: ATIConfigurationDetailsProviders) => {
  const rawUrl = buildPageATIUrl({ atiData, requestContext, serviceContext });
  return sanitizeUrl(rawUrl);
};

export const buildReverbParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ReverbDetailsProviders) => {
  return buildPageReverbParams({ atiData, requestContext, serviceContext });
};

export const buildATIEventTrackingParams = ({
  requestContext,
  serviceContext,
  atiData,
}: ATIConfigurationDetailsProviders) => {
  return buildPageATIParams({
    atiData,
    requestContext,
    serviceContext,
  });
};
