import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withData from '#containers/PageHandlers/withData';
import withHashChangeHandler from '#containers/PageHandlers/withHashChangeHandler';

export default component =>
  pipe(
    withData,
    withError,
    withPageWrapper,
    withContexts,
    withHashChangeHandler,
  )(component);
