import React, { PropsWithChildren } from 'react';

export type StreamContextProps = {
  post: string | null; // e.g. asset:fd4643b5-191b-4794-a7ac-59b18c322c35
};

export const StreamContext = React.createContext<StreamContextProps>(
  {} as StreamContextProps,
);

export const StreamProvider = ({
  post,
  children,
}: PropsWithChildren<StreamContextProps>) => {
  const value = {
    post,
  };

  return (
    <StreamContext.Provider value={value}>{children}</StreamContext.Provider>
  );
};
