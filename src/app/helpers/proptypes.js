import { arrayOf, shape, string } from 'prop-types';

export const imagePropTypes = {
  model: shape({
    blocks: arrayOf(
      shape({
        locator: string,
      }),
    ),
  }),
};

export const textPropTypes = {
  blocks: arrayOf(
    shape({
      model: shape({
        blocks: arrayOf(
          shape({
            text: string,
          }),
        ),
      }),
    }),
  ),
};

const baseDefaultPropTypes = {
  model: {
    blocks: [
      {
        model: {},
      },
    ],
  },
};

export const imageDefaultPropTypes = baseDefaultPropTypes;

export const textDefaultPropTypes = {
  blocks: [baseDefaultPropTypes],
};
