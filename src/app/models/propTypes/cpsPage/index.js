import { bool, shape, string, number, object, arrayOf } from 'prop-types';

export const cpsPageDataPropTypes = shape({
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

const cpsPagePropTypes = {
  isAmp: bool,
  data: cpsPageDataPropTypes,
  service: string,
  status: number,
};

export default cpsPagePropTypes;
