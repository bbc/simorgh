import pipe from 'ramda/src/pipe';
import {
  withVariant,
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
} from '../../HOCs';

export default pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
  withVariant,
);
