import propTypes from 'prop-types';

export const imagePropTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        locator: propTypes.string,
      }),
    ),
  }),
};

export const textPropTypes = {
  blocks: propTypes.arrayOf(
    propTypes.shape({
      model: propTypes.shape({
        blocks: propTypes.arrayOf(
          propTypes.shape({
            text: propTypes.string,
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
