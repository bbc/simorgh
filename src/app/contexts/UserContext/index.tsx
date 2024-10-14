import React, {
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import { v4 as uuid } from 'uuid';
import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import setCookie from '#app/lib/utilities/setCookie';
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

const cknsMvtCookie = () => {
  const cookieName = 'ckns_mvt';
  const cookieValue = Cookie.get(cookieName);

  if (!cookieValue) {
    const cookieUuid = uuid();
    setCookie({ name: cookieName, value: cookieUuid });
  }
};

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());
  const [chartbeatConfig, sendCanonicalChartbeatBeacon] = useState(null);

  if (onClient() && !isOperaProxy()) {
    cknsMvtCookie();
  }

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
