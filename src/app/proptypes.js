import propTypes from 'prop-types';

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

export const textDefaultPropTypes = {
  blocks: [
    {
      model: {
        blocks: [
          {
            model: {},
          },
        ],
      },
    },
  ],
};

export const imagePropTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        locator: propTypes.string,
      }),
    ),
  }),
};

export const imageDefaultPropTypes = {
  model: {
    blocks: [
      {
        model: {},
      },
    ],
  },
};
