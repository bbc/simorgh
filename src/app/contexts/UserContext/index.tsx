import React, {
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { Services, Variants } from '#app/models/types/global';
import {
  getCookiePolicy,
  personalisationEnabled,
  setPreferredVariantCookie,
} from './cookies';
import Chartbeat from './Chartbeat';

type UserContextProps = {
  cookiePolicy: string;
  sendCanonicalChartbeatBeacon: Dispatch<SetStateAction<null>>;
  updateCookiePolicy: Dispatch<SetStateAction<null>>;
  personalisationEnabled: boolean;
  setPreferredVariantCookie: (service: Services, variant: Variants) => void;
};

export const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps,
);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());
  const [chartbeatConfig, sendCanonicalChartbeatBeacon] = useState(null);

  const value = useMemo(
    () => ({
      cookiePolicy,
      sendCanonicalChartbeatBeacon,
      updateCookiePolicy: () => setCookiePolicy(getCookiePolicy()),
      personalisationEnabled: personalisationEnabled(cookiePolicy),
      setPreferredVariantCookie,
    }),
    [cookiePolicy],
  );

  return (
    <UserContext.Provider value={value}>
      <Chartbeat config={chartbeatConfig} />
      {children}
    </UserContext.Provider>
  );
};
