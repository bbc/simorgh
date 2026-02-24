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

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

type AccountProviderProps = {
  initialConfig: IdctaConfig | null;
  initialIsSignedIn?: boolean;
};

export const AccountProvider = ({
  children,
  initialConfig,
  initialIsSignedIn = false,
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

  const isSignedIn = isIdctaAvailable && initialIsSignedIn;

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
