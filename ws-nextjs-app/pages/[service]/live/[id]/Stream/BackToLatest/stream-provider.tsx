import React, { PropsWithChildren } from 'react';

export type StreamContextProps = {
  streamRef: any;
  post: any;
  setPage: any;
  setPost: any;
};

export const StreamContext = React.createContext<StreamContextProps>(
  {} as StreamContextProps,
);

export type StreamProviderProps = {
  streamRef: any;
  post: any;
  setPage: any;
  setPost: any;
  children: any;
};

export const StreamProvider = ({
  streamRef,
  post,
  setPage,
  setPost,
  children,
}: PropsWithChildren<StreamProviderProps>) => {
  const value = {
    streamRef,
    post,
    setPage,
    setPost,
  };

  return (
    <StreamContext.Provider value={value}>{children}</StreamContext.Provider>
  );
};
