import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import ErrorPage from './ErrorPage';

export default pipe(withPageWrapper, withContexts)(ErrorPage);
