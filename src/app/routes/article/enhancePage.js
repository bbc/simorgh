import pipe from 'ramda/src/pipe';
import {
  withVariant,
  withContexts,
  withPageWrapper,
  withError,
  withLoading,
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
