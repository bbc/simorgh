import pipe from 'ramda/src/pipe';
import OnDemandTvPage from './OnDemandTvPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';

export default pipe(
  withMediaError,
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
)(OnDemandTvPage);
