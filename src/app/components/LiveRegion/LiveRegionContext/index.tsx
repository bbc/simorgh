import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

interface ContextProps {
  liveRegionItem: string;
  replaceLiveRegionWith: (item: string) => void;
}

export const LiveRegionContext = createContext({} as ContextProps);

export const LiveRegionContextProvider = ({ children }: PropsWithChildren) => {
  const [liveRegionItem, setLiveRegionItem] = useState('');

  const replaceLiveRegionWith = (item: string) => {
    setLiveRegionItem(item);
  };

  const memoisedLiveRegion = useMemo(
    () => ({
      liveRegionItem,
      replaceLiveRegionWith,
    }),
    [liveRegionItem],
  );

  return (
    <LiveRegionContext.Provider value={memoisedLiveRegion}>
      {children}
    </LiveRegionContext.Provider>
  );
};

export function useLiveRegionContext() {
  return useContext(LiveRegionContext);
}
