import pipe from 'ramda/src/pipe';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const defaultValue = { addVariantHandling: false };

export default ({ addVariantHandling } = defaultValue) =>
  pipe(withData, withError, withLoading, component => {
    if (addVariantHandling) {
      return withVariant(component);
    }
    return component;
  });
