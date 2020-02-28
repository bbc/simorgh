import pipe from 'ramda/src/pipe';
import _ErrorPage from './ErrorPage';
import _RadioPage from './RadioPage';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);
const applyErrorPageHandlers = pipe(withLoading, withPageWrapper, withContexts);

export const ErrorPage = applyErrorPageHandlers(_ErrorPage);
export const RadioPage = applyBasicPageHandlers(_RadioPage);
