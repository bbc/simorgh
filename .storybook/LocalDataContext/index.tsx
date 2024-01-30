import React, { PropsWithChildren } from 'react';

export const LocalDataContext = React.createContext({});

interface DataFetcherProps {
  getInitialData: (args: any) => object;
  params: Record<string, string>;
}

export default ({
  getInitialData,
  params,
  children,
}: PropsWithChildren<DataFetcherProps>) => {
  const data = getInitialData(params);

  console.log({ data });

  return (
    <LocalDataContext.Provider value={data}>
      {children}
    </LocalDataContext.Provider>
  );
};
