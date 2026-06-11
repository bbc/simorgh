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
import { ATIData } from '#app/components/ATIAnalytics/types';
import setBBCPage from '#app/lib/analyticsUtils/setBBCPage';

type ReverbParamsContextProps = {
  atiData?: ATIData;
};

export const ReverbParamsContext = createContext<ReverbParamsContextProps>(
  {} as ReverbParamsContextProps,
);

type ReverbParamsProviderProps = {
  atiData?: ATIData;
};

export const ReverbParamsContextProvider = ({
  children,
  atiData,
}: PropsWithChildren<ReverbParamsProviderProps>) => {
  const requestContext = use(RequestContext);
  const serviceContext = use(ServiceContext);
  const accountContext = use(AccountContext);

  useEffect(() => {
    setBBCPage({ atiData, requestContext, serviceContext, accountContext });
  }, [accountContext, atiData, requestContext, serviceContext]);

  const value = useMemo(
    () => ({
      atiData,
    }),
    [atiData],
  );

  return (
    <ReverbParamsContext.Provider value={value}>
      {children}
    </ReverbParamsContext.Provider>
  );
};
