import pipe from 'ramda/src/pipe';
import ErrorPage from './ErrorPage';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withLoading from '#containers/PageHandlers/withLoading';

export default pipe(withLoading, withPageWrapper, withContexts)(ErrorPage);
