import pipe from 'ramda/src/pipe';

import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import OnDemandTvPage from './OnDemandTvPage';

export default pipe(withMediaError, applyBasicPageHandlers)(OnDemandTvPage);
