import { arrayOf, bool, number, shape, string } from 'prop-types';
import mainContentPropTypes from '../mainContent';

const articlePropTypes = {
  amp: bool,
  data: shape({
    metadata: shape({
      id: string.isRequired,
      type: string.isRequired,
      createdBy: string,
      blockId: string.isRequired,
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
    }).isRequired,
    content: shape({
      model: shape(mainContentPropTypes),
    }).isRequired,
    promo: shape({
      id: string.isRequired,
      headlines: shape({
        seoHeadline: string.isRequired,
        promoHeadline: string,
      }),
      locators: shape({
        optimoUrn: string.isRequired,
      }),
      summary: string,
      timestamp: number,
    }).isRequired,
  }),
  service: string,
};

export default articlePropTypes;
