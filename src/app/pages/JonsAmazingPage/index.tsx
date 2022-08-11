import pipe from 'ramda/src/pipe';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';

import JonsAmazingPage from './JonsAmazingPage';

const applyBasicPageHandlers = pipe(withPageWrapper, withContexts);

export default applyBasicPageHandlers(JonsAmazingPage);
