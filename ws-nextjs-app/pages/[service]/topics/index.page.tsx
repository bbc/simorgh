import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import handleTopicsRoute from './handleTopicsRoute';

const TopicsPageComponent = dynamic(() => import('./TopicsIndexPage'));

export const getServerSideProps: GetServerSideProps = async context =>
  handleTopicsRoute(context);

export default TopicsPageComponent;
