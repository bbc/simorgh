import pipe from 'ramda/src/pipe';
import _RadioPage from './RadioPage';
import withContexts from '../containers/PageHandlers/withContexts';
import withPageWrapper from '../containers/PageHandlers/withPageWrapper';
import withError from '../containers/PageHandlers/withError';
import withLoading from '../containers/PageHandlers/withLoading';
import withData from '../containers/PageHandlers/withData';

const enhancePage = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);

// eslint-disable-next-line import/prefer-default-export
export const RadioPage = enhancePage(_RadioPage);
