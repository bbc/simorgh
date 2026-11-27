import {
  createContext,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
} from 'react';
import onClient from '#app/lib/utilities/onClient';
import isOperaProxy from '#app/lib/utilities/isOperaProxy';
import getOrCreateCknsMvtCookie from '#app/lib/utilities/getOrCreateCknsMvtCookie';
import { getCookiePolicy, personalisationEnabled } from './cookies';

export type UserContextProps = {
  cookiePolicy: string;
  updateCookiePolicy: Dispatch<SetStateAction<null>>;
  personalisationEnabled: boolean;
};

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps,
);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [cookiePolicy, setCookiePolicy] = useState(getCookiePolicy());

  if (onClient() && !isOperaProxy()) {
    getOrCreateCknsMvtCookie();
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
