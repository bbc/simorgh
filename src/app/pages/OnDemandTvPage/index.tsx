import pipe from 'ramda/src/pipe';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import OnDemandTvPage from './OnDemandTvPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(withMediaError, applyBasicPageHandlers)(OnDemandTvPage);
