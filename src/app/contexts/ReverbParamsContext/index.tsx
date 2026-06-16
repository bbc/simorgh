import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useMemo,
} from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountContext } from '#app/contexts/AccountContext';
import withOptimizelyProvider from '#app/legacy/containers/PageHandlers/withOptimizelyProvider';
import buildReverbParams from '#app/components/ATIAnalytics/params';
import {
  ATIData,
  ReverbBeaconConfig,
} from '#app/components/ATIAnalytics/types';
import setBBCPage from '#app/lib/analyticsUtils/setBBCPage';
import getEnrichedATIData from './getEnrichedATIData';

type ReverbParamsContextProps = ReverbBeaconConfig;

export const ReverbParamsContext = createContext<ReverbParamsContextProps>(
  {} as ReverbParamsContextProps,
);

type ReverbParamsProviderProps = {
  atiData?: ATIData;
};

const ReverbParamsContextProviderComponent = ({
  children,
  atiData = {},
  pageMetadata,
}: PropsWithChildren<ReverbParamsProviderProps>) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isSignedIn, hashedUserId: hashedId } = use(AccountContext);

  const enrichedAtiData = getEnrichedATIData({
    atiData,
    pageMetadata,
    requestContext,
    serviceContext,
  });

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData: enrichedAtiData,
    isSignedIn,
    hashedId,
  });

  const {
    params: { page, user },
  } = reverbParams;

  useEffect(() => {
    setBBCPage({ page, user });
  }, [page, user]);

  const value = useMemo(() => reverbParams, [reverbParams]);

  return (
    <ReverbParamsContext.Provider value={value}>
      {children}
    </ReverbParamsContext.Provider>
  );
};

export const ReverbParamsContextProvider = withOptimizelyProvider(
  ReverbParamsContextProviderComponent,
);
