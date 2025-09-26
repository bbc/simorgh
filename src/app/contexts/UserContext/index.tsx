import React, {
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import setCookie from '#app/lib/utilities/setCookie';
import getUUID from '#app/lib/utilities/getUUID';
import { getCookiePolicy, personalisationEnabled } from './cookies';

export type UserContextProps = {
  cookiePolicy: string;
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
    const cookieUuid = getUUID();
    setCookie({ name: cookieName, value: cookieUuid });
  }
};

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());

  if (onClient() && !isOperaProxy()) {
    cknsMvtCookie();
  }

  const value = useMemo(
    () => ({
      cookiePolicy,
      updateCookiePolicy: () => setCookiePolicy(getCookiePolicy()),
      personalisationEnabled: personalisationEnabled(cookiePolicy),
    }),
    [cookiePolicy],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
