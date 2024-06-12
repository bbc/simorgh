import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';
import withHashChangeHandler from '#containers/PageHandlers/withHashChangeHandler';

const defaultValue = { addVariantHandling: false };

export default ({ addVariantHandling } = defaultValue) =>
  pipe(
    withData,
    withError,
    withPageWrapper,
    withContexts,
    component => {
      if (addVariantHandling) {
        return withVariant(component);
      }
      return component;
    },
    withHashChangeHandler,
  );
