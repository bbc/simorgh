import { bool, shape, string, number, object, arrayOf } from 'prop-types';

export const cpsAssetPageDataPropTypes = shape({
  metadata: shape({
    id: string,
    tags: object,
    type: string,
  }),
  promo: shape({
    id: string,
    type: string,
  }),
  content: shape({
    blocks: arrayOf(
      shape({
        uuid: string,
        id: string,
        text: string,
        type: string,
      }),
    ),
  }),
});

const cpsAssetPagePropTypes = {
  isAmp: bool,
  data: cpsAssetPageDataPropTypes,
  service: string,
  status: number,
};

export default cpsAssetPagePropTypes;
