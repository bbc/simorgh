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
import { getIdctaUserOrigin } from '#app/lib/idcta/getIDCTAUserOrigin';
import useToggle from '#app/hooks/useToggle';
import isLocal from '#app/lib/utilities/isLocal';
import { USER_ID_COOKIE_KEY } from '#app/lib/uasApi/uasUtility';
import { TOKEN_COOKIE_NAME } from '#app/lib/uasApi/tokenRefresh/tokenManager';

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

type AccountProviderProps = {
  initialConfig: IdctaConfig | null;
};

const getClientCookie = (cookieName: string) => {
  return onClient() ? Cookie.get(cookieName) : undefined;
};

export const AccountProvider = ({
  children,
  initialConfig,
}: PropsWithChildren<AccountProviderProps>) => {
  const { locale, atiAnalyticsProducerName } = use(ServiceContext);
  const { isAmp = false, isApp = false, isLite = false } = use(RequestContext);
  const [pageToReturnTo, setPageToReturnTo] = useState<string | null>(null);
  const { service } = use(ServiceContext);
  const { enabled: isPersonalizationToggleEnabled, value: accountService } =
    useToggle('uasPersonalization');

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
          userOrigin: getIdctaUserOrigin(atiAnalyticsProducerName),
        })
      : initialConfig?.unavailable_url;
  };

  const signInUrl = buildAccountUrl(initialConfig?.signin_url);
  const registerUrl = buildAccountUrl(initialConfig?.register_url);
  const settingsUrl = buildAccountUrl(initialConfig?.settings_url);
  const signOutUrl = buildAccountUrl(initialConfig?.signout_url);
  const forYouUrl = buildAccountUrl(initialConfig?.foryou_url);

  const signedInToken = getClientCookie(
    initialConfig?.identity?.idSignedInCookieName || TOKEN_COOKIE_NAME,
  );

  const hashedUserId = getClientCookie(USER_ID_COOKIE_KEY);

  const isSignedIn =
    isIdctaAvailable &&
    Boolean(initialConfig?.initialIsSignedIn || signedInToken);

  const isPersonalizationAvailable =
    isIdctaAvailable &&
    isPersonalizationToggleEnabled &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const isPersonalizationEnabled = isPersonalizationAvailable && isSignedIn;

  const isRefreshAvailable =
    isIdctaAvailable && initialConfig?.availability?.refresh === 'GREEN';

  const value = useMemo(
    () => ({
      hashedUserId,
      isIdctaAvailable,
      isRefreshAvailable,
      isSignedIn,
      signInUrl,
      signOutUrl,
      registerUrl,
      settingsUrl,
      forYouUrl,
      isPersonalizationAvailable,
      isPersonalizationEnabled,
    }),
    [
      hashedUserId,
      forYouUrl,
      isIdctaAvailable,
      isRefreshAvailable,
      isSignedIn,
      registerUrl,
      settingsUrl,
      signInUrl,
      signOutUrl,
      isPersonalizationAvailable,
      isPersonalizationEnabled,
    ],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
