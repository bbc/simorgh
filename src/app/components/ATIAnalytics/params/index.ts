import { buildAnalyticsParams } from './buildParams';
import { ReverbDetailsProviders } from '../types';

export default ({
  requestContext,
  serviceContext,
  atiData,
  isSignedIn,
  hashedId,
  isPersonalisationOn,
}: ReverbDetailsProviders & {
  isSignedIn?: boolean;
  hashedId?: string | null;
  isPersonalisationOn?: boolean;
}) =>
  buildAnalyticsParams({
    atiData,
    requestContext,
    serviceContext,
    isSignedIn,
    hashedId,
    isPersonalisationOn,
  });
