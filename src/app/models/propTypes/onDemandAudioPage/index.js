import { bool, shape, string, number } from 'prop-types';

export const onDemandAudioPageDataPropTypes = shape({
  brandTitle: string,
  headline: string,
  summary: string,
  language: string,
  episodeAvailableFrom: number,
  episodeAvailableUntil: number,
  releaseDateTimeStamp: number,
});

const onDemandAudioPagePropTypes = {
  isAmp: bool,
  isLow: bool,
  data: onDemandAudioPageDataPropTypes,
  service: string,
  status: number,
};

export default onDemandAudioPagePropTypes;
