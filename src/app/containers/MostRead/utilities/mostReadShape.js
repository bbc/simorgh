import { string, shape, arrayOf, number, oneOf } from 'prop-types';

const cpsHeadline = {
  shortHeadline: string.isRequired,
};

const cpsLocator = {
  assetUri: string.isRequired,
};

const optimoHeadline = {
  promoHeadline: shape({
    blocks: arrayOf(
      shape({
        model: {
          blocks: arrayOf(shape({ model: { text: string.isRequired } })),
        },
      }),
    ),
  }),
};

const optimoLocator = {
  canonicalUrl: string.isRequired,
};

const mostReadShape = shape({
  lastRecordTimeStamp: string.isRequired,
  records: arrayOf(
    shape({
      id: string.isRequired,
      promo: shape({
        timestamp: number.isRequired,
        headline: shape(oneOf([cpsHeadline, optimoHeadline])),
        locators: shape(oneOf([cpsLocator, optimoLocator])),
      }),
    }),
  ),
});

export default mostReadShape;
