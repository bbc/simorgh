import {
  arrayOf,
  shape,
  string,
  number,
  boolean,
  objectOf,
  any,
} from 'prop-types';

const metadataPropTypes = {
  id: string.isRequired,
  locators: shape({
    assetUri: string,
    cpsUrn: string,
    curie: string,
  }),
  type: string.isRequired,
  createdBy: string.isRequired,
  language: string.isRequired,
  lastUpdated: number.isRequired,
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
  options: shape({
    allowAdvertising: boolean,
  }),
  analyticsLabels: shape({
    counterName: string.isRequired,
    cps_asset_id: string.isRequired,
    cps_asset_type: string.isRequired,
  }),
  tags: objectOf(any),
  version: string.isRequired,
  blockTypes: arrayOf(string),
  title: string.isRequired,
  summary: string.isRequired,
};

export default metadataPropTypes;
