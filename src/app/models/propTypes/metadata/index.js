import {
  any,
  arrayOf,
  boolean,
  number,
  objectOf,
  shape,
  string,
} from 'prop-types';

export const mediaMetadataPropTypes = {
  analyticsLabels: shape({
    pageIdentifier: string.isRequired,
    pageTitle: string.isRequired,
  }),
  blockTypes: arrayOf(string),
  createdBy: string,
  firstPublished: number,
  id: string.isRequired,
  title: string.isRequired,
  language: string.isRequired,
  lastPublished: number,
  lastUpdated: number,
  locators: objectOf(any),
  options: objectOf(any),
  tags: objectOf(any),
  type: string,
};

export const optimoMetadataPropTypes = {
  id: string.isRequired,
  type: string.isRequired,
  createdBy: string,
  created: number,
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
  lastUpdated: number.isRequired,
  locators: shape({
    optimoUrn: string.isRequired,
  }),
  passport: shape({
    language: string.isRequired,
    home: string.isRequired,
    category: string,
    genre: string,
  }),
  tags: shape({
    about: arrayOf(
      shape({
        thingUri: string,
        topicId: string,
        topicName: string,
        curationType: arrayOf(string),
        thingId: string,
        thingLabel: string,
        thingType: arrayOf(string),
      }),
    ),
    mentions: arrayOf(shape({})),
  }),
  version: string,
  blockTypes: arrayOf(string),
};

const cpsMetaDataPropTypes = {
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
};

export const cpsFrontPageMetadataPropTypes = {
  ...cpsMetaDataPropTypes,
  title: string.isRequired,
  summary: string.isRequired,
};

export const cpsAssetPageMetadataPropTypes = {
  ...cpsMetaDataPropTypes,
};
