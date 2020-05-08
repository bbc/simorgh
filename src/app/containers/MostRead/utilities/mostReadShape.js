import { string, shape, arrayOf, number, oneOf } from 'prop-types';

const cpsMostReadRecord = {
  id: string.isRequired,
  promo: shape({
    timestamp: number.isRequired,
    headlines: shape({
      shortHeadline: string.isRequired,
    }),
    locators: shape({
      assetUri: string.isRequired,
    }),
  }),
};

const optimoMostReadRecord = {
  id: string.isRequired,
  timestamp: number.isRequired,
  locators: shape({
    canonicalUrl: string.isRequired,
  }),
  headlines: shape({
    promoHeadline: shape({
      blocks: arrayOf(
        shape({
          model: {
            blocks: arrayOf(shape({ model: { text: string.isRequired } })),
          },
        }),
      ),
    }),
  }),
};

const mostReadShape = shape({
  lastRecordTimeStamp: string.isRequired,
  records: arrayOf(oneOf[(cpsMostReadRecord, optimoMostReadRecord)]),
});

export default mostReadShape;
