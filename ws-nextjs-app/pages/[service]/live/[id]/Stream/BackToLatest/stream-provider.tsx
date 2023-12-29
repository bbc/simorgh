import React, { PropsWithChildren } from 'react';

export type StreamContextProps = {
  streamRef: any;
  post: any;
  setPage: any;
  setPost: any;
  activePage: number | undefined;
  hiddenHeadlineRef: any;
};

export const StreamContext = React.createContext<StreamContextProps>(
  {} as StreamContextProps,
);

export type StreamProviderProps = {
  streamRef: any; // HTML element?
  post: string | null; // e.g. asset:fd4643b5-191b-4794-a7ac-59b18c322c35
  setPage: any;
  setPost: any;
  children: any;
  activePage: number | undefined;
  hiddenHeadlineRef: any;
};

export const StreamProvider = ({
  streamRef,
  post,
  setPage,
  setPost,
  children,
  activePage,
  hiddenHeadlineRef,
}: PropsWithChildren<StreamProviderProps>) => {
  const value = {
    streamRef,
    post,
    setPage,
    setPost,
    activePage,
    hiddenHeadlineRef,
  };

  return (
    <StreamContext.Provider value={value}>{children}</StreamContext.Provider>
  );
};
