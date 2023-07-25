import pipe from 'ramda/src/pipe';
import TopicPage from './TopicPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
)(TopicPage);
