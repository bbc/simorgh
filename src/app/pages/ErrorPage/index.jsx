import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';
import ErrorPage from './ErrorPage';

export default pipe(withLoading, withPageWrapper, withContexts)(ErrorPage);
