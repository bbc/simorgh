import { arrayOf, number, shape, string } from 'prop-types';

const metadataPropTypes = {
  id: string.isRequired,
  type: string.isRequired,
  createdBy: string,
  created: number.isRequired,
  firstPublished: number.isRequired,
  lastPublished: number.isRequired,
  lastUpdated: number.isRequired,
  locators: shape({
    optimoUrn: string.isRequired,
  }),
  passport: shape({
    language: string.isRequired,
    home: string.isRequired,
    category: string.isRequired,
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

export default metadataPropTypes;
