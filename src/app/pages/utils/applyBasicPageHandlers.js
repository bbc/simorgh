import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const defaultValue = { addVariantHandling: false };

export default ({ addVariantHandling } = defaultValue) =>
  pipe(
    withData,
    withError,
    withLoading,
    withPageWrapper,
    withContexts,
    component => {
      if (addVariantHandling) {
        return withVariant(component);
      }
      return component;
    },
  );
