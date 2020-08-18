import pipe from 'ramda/src/pipe';
import OnDemandTvPage from './OnDemandTvPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';

export default pipe(
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
  withMediaError,
)(OnDemandTvPage);
