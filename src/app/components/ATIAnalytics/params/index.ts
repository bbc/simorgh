import { buildPageATIParams, buildPageReverbParams } from './buildParams';
import {
  ATIConfigurationDetailsProviders,
  ReverbDetailsProviders,
} from '../types';

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
