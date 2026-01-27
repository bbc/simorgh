import React, { createContext, use, useEffect, useMemo, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import { AccountContextProps, IdctaConfig } from '#app/models/types/account';
import appendCtaQueryParams from '#app/lib/idcta/appendCtaQueryParams';

export const AccountContext = createContext<AccountContextProps | null>(null);

const getSignedInCookie = (cookieName = 'ckns_id') => {
  return onClient() ? Cookie.get(cookieName) : false;
};

export const AccountProvider = ({
  children,
  initialConfig,
}: {
  children: React.ReactNode;
  initialConfig: IdctaConfig | null;
}) => {
  const { locale } = use(ServiceContext);
  const [ptrt, setPtrt] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPtrt(window.location.href);
  }, []);

  const idIdctaAvailable = initialConfig?.['id-availability'] === 'GREEN';

  const buildAccountUrl = (url?: string) => {
    return idIdctaAvailable && url
      ? appendCtaQueryParams(url, { ptrt, lang: locale })
      : initialConfig?.unavailable_url;
  };

  const signInUrl = buildAccountUrl(initialConfig?.signin_url);
  const registerUrl = buildAccountUrl(initialConfig?.register_url);
  const settingsUrl = buildAccountUrl(initialConfig?.settings_url);
  const signOutUrl = buildAccountUrl(initialConfig?.signout_url);

  const cookieName = initialConfig?.identity.idSignedInCookieName;
  const isSignedIn = idIdctaAvailable
    ? Boolean(getSignedInCookie(cookieName))
    : false;

  const value = useMemo(
    () => ({
      idIdctaAvailable,
      isSignedIn,
      signInUrl,
      signOutUrl,
      registerUrl,
      settingsUrl,
    }),
    [
      idIdctaAvailable,
      isSignedIn,
      registerUrl,
      settingsUrl,
      signInUrl,
      signOutUrl,
    ],
  );

  if (!initialConfig) {
    return children;
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
