import pipe from 'ramda/src/pipe';
import OnDemandAudioPage from './OnDemandAudioPage';
import applyBasicPageHandlers from '../utils/applyBasicPageHandlers';
import withMediaError from '#lib/utilities/episodeAvailability/withMediaError';
import withPodcastData from './withPodcastData';

export default pipe(
  withMediaError,
  withPodcastData,
  applyBasicPageHandlers({
    addVariantHandling: false,
  }),
)(OnDemandAudioPage);
