import { bool, shape, string, number } from 'prop-types';
import { mediaMetadataPropTypes } from '../metadata';
import { onDemandRadioPromoPropTypes } from '../promo';
import onDemandRadioPageContentPropTypes from './content';

export const onDemandMockPageDataPropTypes = shape({
  metadata: shape(mediaMetadataPropTypes).isRequired,
  promo: shape(onDemandRadioPromoPropTypes).isRequired,
  content: shape(onDemandRadioPageContentPropTypes).isRequired,
});

const onDemandMockPagePropTypes = {
  isAmp: bool,
  data: onDemandMockPageDataPropTypes,
  service: string,
  status: number,
};

export default onDemandMockPagePropTypes;
