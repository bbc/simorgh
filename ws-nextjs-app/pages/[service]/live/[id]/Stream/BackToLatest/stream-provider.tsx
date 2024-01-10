import React, { PropsWithChildren } from 'react';

export type StreamContextProps = {
  streamRef: unknown; // HTML element/ null?
  post: string | null; // e.g. asset:fd4643b5-191b-4794-a7ac-59b18c322c35
  activePage: number | undefined;
};

export const StreamContext = React.createContext<StreamContextProps>(
  {} as StreamContextProps,
);

export const StreamProvider = ({
  streamRef,
  post,
  children,
  activePage,
}: PropsWithChildren<StreamContextProps>) => {
  const value = {
    streamRef,
    post,
    activePage,
  };

  return (
    <StreamContext.Provider value={value}>{children}</StreamContext.Provider>
  );
};
