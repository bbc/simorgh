import WithPageWrapper from '../../src/app/legacy/containers/PageHandlers/withPageWrapper';
import { ServiceContextProvider } from '../../src/app/contexts/ServiceContext/index';
import { ToggleContextProvider } from '../../src/app/contexts/ToggleContext';

import Head from 'next/head';

const Home = () => {
  const Component = WithPageWrapper(() => <div>hello</div>);
  return (
    <ToggleContextProvider>
      <ServiceContextProvider service="mundo">
        <Component />
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default Home;
