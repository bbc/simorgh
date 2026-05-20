import {
  createContext,
  type Dispatch,
  type PropsWithChildren,
  useMemo,
  useReducer,
} from 'react';

import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import type { Environments, Toggles } from '#app/models/types/global';
import defaultToggles from '#lib/config/toggles';
import toggleReducer from './reducer';

const environment = (getEnvConfig().SIMORGH_APP_ENV || 'local') as Environments;

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
  toggles = defaultToggles[environment],
}: PropsWithChildren<ToggleContextProviderProps>) => {
  const [toggleState, toggleDispatch] = useReducer(toggleReducer, toggles);

  const toggleContextValue = useMemo(
    () => ({
      toggleState,
      toggleDispatch,
    }),
    [toggleState],
  );
  return (
    <ToggleContext.Provider value={toggleContextValue}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

export { ToggleContext, ToggleContextConsumer, ToggleContextProvider };
