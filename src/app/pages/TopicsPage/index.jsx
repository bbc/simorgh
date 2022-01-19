import pipe from 'ramda/src/pipe';
import TopicsPage from './TopicsPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
)(TopicsPage);
