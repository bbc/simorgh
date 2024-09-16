import React, {
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { getCookiePolicy, personalisationEnabled } from './cookies';
import Chartbeat from './Chartbeat';

export type UserContextProps = {
  cookiePolicy: string;
  sendCanonicalChartbeatBeacon: Dispatch<SetStateAction<null>>;
  updateCookiePolicy: Dispatch<SetStateAction<null>>;
  personalisationEnabled: boolean;
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
