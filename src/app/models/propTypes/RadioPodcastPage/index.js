import { bool, shape, string, number } from 'prop-types';

export const RadioPodcastPageDataPropTypes = shape({
  brandTitle: string,
  headline: string,
  summary: string,
  language: string,
  episodeAvailableFrom: number,
  episodeAvailableUntil: number,
  releaseDateTimeStamp: number,
});

const onDemandPagePropTypes = {
  isAmp: bool,
  data: RadioPodcastPageDataPropTypes,
  service: string,
  status: number,
};

export default onDemandPagePropTypes;
