import pipe from 'ramda/src/pipe';

import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import OnDemandAudioPage from './OnDemandAudioPage';

export default pipe(withMediaError, applyBasicPageHandlers)(OnDemandAudioPage);
