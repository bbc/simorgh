import { bool, shape, string, number } from 'prop-types';
import liveRadioPageContentPropTypes from './content';

export const liveRadioPageDataPropTypes = shape({
  language: string,
  id: string,
  name: string,
  pageTitle: string,
  contentType: string,
  pageIdentifier: string,
  summary: string,
  content: shape(liveRadioPageContentPropTypes).isRequired,
});

const liveRadioPagePropTypes = {
  isAmp: bool,
  data: liveRadioPageDataPropTypes,
  service: string,
  status: number,
};

export default liveRadioPagePropTypes;
