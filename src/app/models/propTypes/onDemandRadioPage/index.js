import { bool, shape, string, number } from 'prop-types';
import { mediaMetadataPropTypes } from '../metadata';
import { onDemandRadioPromoPropTypes } from '../promo';
import onDemandRadioPageContentPropTypes from './content';

export const onDemandRadioPageDataPropTypes = shape({
  metadata: shape(mediaMetadataPropTypes).isRequired,
  promo: shape(onDemandRadioPromoPropTypes).isRequired,
  content: shape(onDemandRadioPageContentPropTypes).isRequired,
});

const onDemandMockPagePropTypes = {
  isAmp: bool,
  data: onDemandRadioPageDataPropTypes,
  service: string,
  status: number,
};

export default onDemandMockPagePropTypes;
