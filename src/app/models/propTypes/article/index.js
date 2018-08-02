import { array, arrayOf, number, shape, string } from 'prop-types';

const articlePropTypes = {
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
        articleType: string.isRequired,
        genre: string,
      }),
      tags: {
        about: string,
        mentions: string,
      },
      version: string,
      blockTypes: arrayOf(string),
    }).isRequired,
    content: shape({
      model: shape({
        blocks: array,
      }),
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
  }).isRequired,
};

export default articlePropTypes;
