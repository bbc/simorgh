import React, { createContext } from 'react';


const ExperimentContext = React.createContext({});

const ExperimentContextProvider = ({ children, dataMvtValue }) => {
  return (
    <ExperimentContext.Provider value={dataMvtValue}>
      {children}
    </ExperimentContext.Provider>
  );
};

const ExperimentContextConsumer = ExperimentContext.Consumer;

export { ExperimentContext, ExperimentContextProvider, ExperimentContextConsumer };
