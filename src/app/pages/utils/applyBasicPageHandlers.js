import pipe from 'ramda/src/pipe';
import withError from '#containers/PageHandlers/withError';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const defaultValue = { addVariantHandling: false };

export default ({ addVariantHandling } = defaultValue) =>
  pipe(withData, withError, component => {
    if (addVariantHandling) {
      return withVariant(component);
    }
    return component;
  });
