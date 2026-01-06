import React, { createContext, useMemo } from 'react';
import { isSignedIn } from './idcta/isSignedIn';

export type AccountContextProps = {
  isSignInAvailable: boolean;
  accountUrl: string;
  signInUrl: string;
  registerUrl: string;
  isSignedIn: boolean | null;
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
  const signInAvailability = initialConfig.availability.signin === 'GREEN';
  const unavailableUrl = initialConfig?.unavailable_url;

  console.log({ initialConfig });
  // TODO: Consider using `ptrt` if not working by default
  const signInUrl = signInAvailability
    ? initialConfig?.signin_url
    : unavailableUrl;

  const registerUrl = signInAvailability
    ? initialConfig?.register_url
    : unavailableUrl;

  const accountUrl =
    initialConfig?.['foryou-flagpole'] === 'GREEN'
      ? initialConfig.foryou_url
      : unavailableUrl;

  const isUserSignedIn = signInAvailability ? isSignedIn() : null;

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
