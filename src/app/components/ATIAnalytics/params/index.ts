import { buildPageReverbParams, buildPageResonanceParams } from './buildParams';
import { ReverbDetailsProviders } from '../types';
// add types as needed, e.g. import { ResonanceDetailsProviders } from '../types';

// add function to build resonance params, e.g.
export const buildResonanceParams = ({
  requestContext,
  serviceContext,
  isSignedIn,
  hashedId,
  // ResonanceDetailsProviders
}: any) => {
  return buildPageResonanceParams({
    requestContext,
    serviceContext,
    isSignedIn,
    hashedId,
  });
};

// change this to not be default
export default ({
  requestContext,
  serviceContext,
  atiData,
  isSignedIn,
  hashedId,
}: ReverbDetailsProviders & {
  isSignedIn?: boolean;
  hashedId?: string | null;
}) => {
  return buildPageReverbParams({
    atiData,
    requestContext,
    serviceContext,
    isSignedIn,
    hashedId,
  });
};
