import { arrayOf, number, shape, string } from 'prop-types';

export const optimoPropTypes = {
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

export const cpsPropTypes = {
  type: string.isRequired,
  language: string.isRequired,
  summary: string.isRequired,
  promo: shape({
    name: string.isRequired,
  }),
};
