import React, {
  PropsWithChildren,
  createContext,
  useContext,
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

  return (
    <LiveRegionContext.Provider
      value={{
        liveRegionItem,
        replaceLiveRegionWith,
      }}
    >
      {children}
    </LiveRegionContext.Provider>
  );
};

export function useLiveRegionContext() {
  return useContext(LiveRegionContext);
}
