import pipe from 'ramda/src/pipe';

import withContexts from '#containers/PageHandlers/withContexts';
import withData from '#containers/PageHandlers/withData';
import withError from '#containers/PageHandlers/withError';
import withHashChangeHandler from '#containers/PageHandlers/withHashChangeHandler';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';

export default (
  component,
  { handlerBeforeContexts = Component => Component } = {},
) =>
  pipe(
    withData,
    withError,
    withPageWrapper,
    handlerBeforeContexts,
    withContexts,
    withHashChangeHandler,
  )(component);
