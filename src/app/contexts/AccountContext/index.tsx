import {
  createContext,
  PropsWithChildren,
  use,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AccountContextProps, IdctaConfig } from '#app/models/types/account';
import appendCtaQueryParams from '#app/lib/idcta/appendCtaQueryParams';
import { ServiceContext } from '#app/contexts/ServiceContext';
import onClient from '#app/lib/utilities/onClient';
import Cookie from 'js-cookie';

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

type AccountProviderProps = {
  initialConfig: IdctaConfig | null;
};

const getSignedInCookie = (cookieName = 'ckns_id') => {
  return onClient() ? Cookie.get(cookieName) : false;
};

export const AccountProvider = ({
  children,
  initialConfig,
}: PropsWithChildren<AccountProviderProps>) => {
  const { locale } = use(ServiceContext);
  const [pageToReturnTo, setPageToReturnTo] = useState<string | null>(null);

  useEffect(() => {
    setPageToReturnTo(window.location.href);
  }, []);

  const isIdctaAvailable = initialConfig?.['id-availability'] === 'GREEN';

  const buildAccountUrl = (url?: string) => {
    return isIdctaAvailable && url
      ? appendCtaQueryParams(url, { pageToReturnTo, lang: locale })
      : initialConfig?.unavailable_url;
  };

  const signInUrl = buildAccountUrl(initialConfig?.signin_url);
  const registerUrl = buildAccountUrl(initialConfig?.register_url);
  const settingsUrl = buildAccountUrl(initialConfig?.settings_url);
  const signOutUrl = buildAccountUrl(initialConfig?.signout_url);
  const forYouUrl = buildAccountUrl(initialConfig?.foryou_url);

  // TODO: Only checks client-side cookie presence, it will be improved to detect signed-in status server side
  // Ticket: https://bbc.atlassian.net/browse/WS-2388
  const clientSignedInState = getSignedInCookie(
    initialConfig?.identity?.idSignedInCookieName,
  );
  const isSignedIn =
    isIdctaAvailable &&
    Boolean(initialConfig?.initialIsSignedIn || clientSignedInState);

  const value = useMemo(
    () => ({
      isIdctaAvailable,
      isSignedIn,
      signInUrl,
      signOutUrl,
      registerUrl,
      settingsUrl,
      forYouUrl,
    }),
    [
      forYouUrl,
      isIdctaAvailable,
      isSignedIn,
      registerUrl,
      settingsUrl,
      signInUrl,
      signOutUrl,
    ],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
