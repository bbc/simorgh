import { buildPageReverbParams } from './buildParams';
// add import e.g. import { buildPageResonanceParams } from './buildParams';
import { ReverbDetailsProviders } from '../types';
// add types as needed, e.g. import { ResonanceDetailsProviders } from '../types';

// add function to build resonance params, e.g.
// export const buildResonanceParams = ({
//   requestContext,
//   serviceContext,
//   atiData,
//   ...
// }: ResonanceDetailsProviders) => {
//   return buildPageReverbParams({ atiData, requestContext, serviceContext });
// };

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
