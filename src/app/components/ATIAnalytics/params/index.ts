import { ReverbDetailsProviders } from '../types';
import { buildPageReverbParams } from './buildParams';

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
