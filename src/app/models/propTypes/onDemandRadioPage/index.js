import { bool, shape, string, number } from 'prop-types';

export const onDemandRadioPageDataPropTypes = shape({
  metadata: shape({
    id: string,
    language: string,
  }),
  brandTitle: string,
  episodeTitle: string,
  headline: string,
  shortSynopsis: string,
  summary: string,
});

const onDemandPagePropTypes = {
  isAmp: bool,
  data: onDemandRadioPageDataPropTypes,
  service: string,
  status: number,
};

export default onDemandPagePropTypes;
