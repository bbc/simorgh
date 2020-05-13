import { string, shape, arrayOf, number } from 'prop-types';

const mostReadShape = shape({
  lastRecordTimeStamp: string.isRequired,
  records: arrayOf(
    shape({
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
    }),
  ),
});

export default mostReadShape;
