import WithPageWrapper from '../../src/app/legacy/containers/PageHandlers/withPageWrapper';
import Head from 'next/head';

const Home = () => {
  return WithPageWrapper(<div>hello</div>)();
};

export default Home;
