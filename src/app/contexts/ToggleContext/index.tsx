import React, {
  createContext,
  useReducer,
  Dispatch,
  ReducerAction,
  PropsWithChildren,
} from 'react';
import defaultToggles from '#lib/config/toggles';
import { Environments } from '#app/models/types/global';
import toggleReducer from './reducer';

const environment = (process.env.SIMORGH_APP_ENV || 'local') as Environments;

type ToggleContextProps = {
  toggleState: {
    [key: string]: {
      enabled: boolean;
      value?: string;
    };
  };
  toggleDispatch: Dispatch<ReducerAction<typeof toggleReducer>>;
};

const ToggleContext = createContext<ToggleContextProps>(
  {} as ToggleContextProps,
);

type ToggleContextProviderProps = {
  toggles?: {
    [key: symbol]: {
      enabled: boolean;
      value?: string;
    };
  };
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
