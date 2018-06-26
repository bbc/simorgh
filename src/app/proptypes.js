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

export const videoPropTypes = {
  model: propTypes.shape({
    blocks: propTypes.arrayOf(
      propTypes.shape({
        locator: propTypes.string,
        blocks: propTypes.arrayOf(
          // raw video
          propTypes.shape({
            model: propTypes.shape({
              isLive: propTypes.bool,
              duration: propTypes.string,
              locator: propTypes.string
            }),
          }),
          // alt text
          propTypes.shape(textPropTypes),
          // image 
          propTypes.shape(imagePropTypes)
        ),
      }),
    ),
  }),
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

export const videoDefaultPropTypes = baseDefaultPropTypes;

export const textDefaultPropTypes = {
  blocks: [baseDefaultPropTypes],
};
