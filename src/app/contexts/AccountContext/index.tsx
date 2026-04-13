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
import { RequestContext } from '#app/contexts/RequestContext';
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
  const { isAmp = false, isApp = false, isLite = false } = use(RequestContext);
  const [pageToReturnTo, setPageToReturnTo] = useState<string | null>(null);

  useEffect(() => {
    setPageToReturnTo(window.location.href);
  }, []);

  // IDCTA / UAS is not available on AMP, Lite or App platforms — ensure provider
  // centralises this logic so individual components don't need to check platform.
  const isIdctaAvailable =
    initialConfig?.['id-availability'] === 'GREEN' &&
    !isAmp &&
    !isLite &&
    !isApp;

  const buildAccountUrl = (url?: string) => {
    return isIdctaAvailable && url
      ? appendCtaQueryParams(url, {
          pageToReturnTo,
          lang: locale,
          userOrigin:
            initialConfig?.env === 'live'
              ? 'WS_NEWS_HINDI'
              : 'WS_NEWS_HINDI_TEST',
        })
      : initialConfig?.unavailable_url;
  };

  const signInUrl = buildAccountUrl(initialConfig?.signin_url);
  const registerUrl = buildAccountUrl(initialConfig?.register_url);
  const settingsUrl = buildAccountUrl(initialConfig?.settings_url);
  const signOutUrl = buildAccountUrl(initialConfig?.signout_url);
  const forYouUrl = buildAccountUrl(initialConfig?.foryou_url);

  // TODO: initialIsSignedIn is always false in test/live env due to filtered cookie header,
  // it will be improved to detect signed-in status server side in the future
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
