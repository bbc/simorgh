import pipe from 'ramda/src/pipe';
import withContexts from '../../containers/PageHandlers/withContexts';
import withPageWrapper from '../../containers/PageHandlers/withPageWrapper';
import withError from '../../containers/PageHandlers/withError';
import withLoading from '../../containers/PageHandlers/withLoading';
import withData from '../../containers/PageHandlers/withData';

export default pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);
