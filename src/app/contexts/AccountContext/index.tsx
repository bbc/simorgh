import React, { createContext, use, useEffect, useMemo, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Cookie from 'js-cookie';
import onClient from '#app/lib/utilities/onClient';
import { AccountContextProps, IdctaConfig } from '#app/models/types/account';
import appendCtaQueryParams from '#app/lib/idcta/appendCtaQueryParams';

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

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

  const signInAvailability = initialConfig?.availability.signin === 'GREEN';
  const unavailableUrl = initialConfig?.unavailable_url;

  const signInUrl = signInAvailability
    ? appendCtaQueryParams(initialConfig?.signin_url, { ptrt, lang: locale })
    : unavailableUrl;

  const registerUrl = signInAvailability
    ? appendCtaQueryParams(initialConfig?.register_url, { ptrt, lang: locale })
    : unavailableUrl;

  const accountUrl =
    initialConfig?.['foryou-flagpole'] === 'GREEN'
      ? initialConfig.foryou_url
      : unavailableUrl;

  // Todo: use  settings_url
  // Todo: use  privacy_settings_url

  const cookieName = initialConfig?.identity.idSignedInCookieName;
  const isSignedIn = signInAvailability
    ? Boolean(getSignedInCookie(cookieName))
    : false;

  const value = useMemo(
    () => ({
      isSignInAvailable: signInAvailability,
      signInUrl,
      registerUrl,
      accountUrl,
      isSignedIn,
    }),
    [accountUrl, isSignedIn, registerUrl, signInAvailability, signInUrl],
  );

  if (!initialConfig) {
    return children;
  }

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
