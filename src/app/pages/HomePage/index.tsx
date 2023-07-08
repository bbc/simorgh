import pipe from 'ramda/src/pipe.js';
import HomePage from './HomePage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(
  applyBasicPageHandlers({
    addVariantHandling: true,
  }),
)(HomePage);
