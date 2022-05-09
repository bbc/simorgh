import pipe from 'ramda/src/pipe';
import identity from 'ramda/src/identity';
import isLive from '#lib/utilities/isLive';
import withContexts from '#containers/PageHandlers/withContexts';
import withRUM from '#containers/PageHandlers/withRUM';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';
import withHashChangeHandler from '#app/containers/PageHandlers/withHashChangeHandler';

const defaultValue = { addVariantHandling: false };

export default ({ addVariantHandling } = defaultValue) =>
  pipe(
    withData,
    withError,
    withLoading,
    withPageWrapper,
    withContexts,
    isLive() ? identity : withRUM,
    component => {
      if (addVariantHandling) {
        return withVariant(component);
      }
      return component;
    },
    withHashChangeHandler,
  );
