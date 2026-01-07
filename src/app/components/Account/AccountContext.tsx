import React, { createContext, use, useEffect, useMemo, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { isSignedIn } from './idcta/isSignedIn';
import appendCtaQueryParams from './idcta/appendCtaQueryParams';

export type AccountContextProps = {
  isSignInAvailable: boolean;
  accountUrl: string;
  signInUrl: string;
  registerUrl: string;
  isSignedIn: boolean;
};

export const AccountContext = createContext<AccountContextProps>(
  {} as AccountContextProps,
);

export const AccountProvider = ({
  children,
  initialConfig = null,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialConfig: any;
}) => {
  const { locale } = use(ServiceContext);

  const [ptrt, setPtrt] = useState<string | undefined>(undefined);

  useEffect(() => {
    setPtrt(window.location.href);
  }, []);

  const signInAvailability = initialConfig.availability.signin === 'GREEN';
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

  const isUserSignedIn = signInAvailability ? isSignedIn() : false;

  const value = useMemo(
    () => ({
      isSignInAvailable: signInAvailability,
      signInUrl,
      registerUrl,
      accountUrl,
      isSignedIn: isUserSignedIn,
    }),
    [accountUrl, isUserSignedIn, registerUrl, signInAvailability, signInUrl],
  );

  return (
    <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
  );
};
