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
import buildReverbParams from '#app/components/ATIAnalytics/params';
import {
  ATIData,
  ReverbBeaconConfig,
} from '#app/components/ATIAnalytics/types';
import setBBCPage from '#app/lib/analyticsUtils/setBBCPage';

type ReverbParamsContextProps = ReverbBeaconConfig;

export const ReverbParamsContext = createContext<ReverbParamsContextProps>(
  {} as ReverbParamsContextProps,
);

type ReverbParamsProviderProps = {
  atiData?: ATIData;
};

export const ReverbParamsContextProvider = ({
  children,
  atiData = {},
}: PropsWithChildren<ReverbParamsProviderProps>) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const { isSignedIn, hashedUserId: hashedId } = use(AccountContext);

  const reverbParams = buildReverbParams({
    requestContext,
    serviceContext,
    atiData,
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
