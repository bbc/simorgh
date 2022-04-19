import pipe from 'ramda/src/pipe';
import StoryPageLite from './StoryPageLite';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
)(StoryPageLite);
