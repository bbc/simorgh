import pipe from 'ramda/src/pipe';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import OnDemandAudioPage from './OnDemandAudioPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';

export default pipe(withMediaError, applyBasicPageHandlers)(OnDemandAudioPage);
