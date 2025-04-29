import React, {
  createContext,
  useReducer,
  Dispatch,
  PropsWithChildren,
  useMemo,
} from 'react';
import defaultToggles from '#lib/config/toggles';
import { Toggles } from '#app/models/types/global';
import toggleReducer from './reducer';

type ToggleContextProps = {
  toggleState: Toggles;
  toggleDispatch: Dispatch<{ type: string; data: { toggles: Toggles } }>;
};

const ToggleContext = createContext<ToggleContextProps>(
  {} as ToggleContextProps,
);

type ToggleContextProviderProps = {
  toggles?: Toggles;
};

const ToggleContextProvider = ({
  children,
  toggles = defaultToggles,
}: PropsWithChildren<ToggleContextProviderProps>) => {
  const [toggleState, toggleDispatch] = useReducer(toggleReducer, toggles);

  const toggleContextValue = useMemo(
    () => ({
      toggleState,
      toggleDispatch,
    }),
    [toggleState, toggleDispatch],
  );
  return (
    <ToggleContext.Provider value={toggleContextValue}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
