import { buildPageReverbParams } from './buildParams';
import { ReverbDetailsProviders } from '../types';

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
