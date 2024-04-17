import React, {
  createContext,
  useReducer,
  Dispatch,
  ReducerAction,
  PropsWithChildren,
} from 'react';
import defaultToggles from '#lib/config/toggles';
import { Environments, Toggles } from '#app/models/types/global';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import toggleReducer from './reducer';

const environment = (getEnvConfig().SIMORGH_APP_ENV || 'local') as Environments;

type ToggleContextProps = {
  toggleState: Toggles;
  toggleDispatch: Dispatch<ReducerAction<typeof toggleReducer>>;
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

  return (
    <ToggleContext.Provider value={{ toggleState, toggleDispatch }}>
      {children}
    </ToggleContext.Provider>
  );
};

const ToggleContextConsumer = ToggleContext.Consumer;

export { ToggleContext, ToggleContextProvider, ToggleContextConsumer };
