import pipe from 'ramda/src/pipe';
import { withContexts, withPageWrapper, withLoading } from '../../HOCs';

export default pipe(withLoading, withPageWrapper, withContexts);
