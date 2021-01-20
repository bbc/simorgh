import { bool, shape, string, number } from 'prop-types';

export const radioPodcastPageDataPropTypes = shape({
  brandTitle: string,
  headline: string,
  summary: string,
  language: string,
  episodeAvailableFrom: number,
  episodeAvailableUntil: number,
  releaseDateTimeStamp: number,
});

const radioPodcastPagePropTypes = {
  isAmp: bool,
  data: radioPodcastPageDataPropTypes,
  service: string,
  status: number,
};

export default radioPodcastPagePropTypes;
