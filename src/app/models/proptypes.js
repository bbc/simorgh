import { arrayOf, shape, string, bool } from 'prop-types';

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

export const videoPropTypes = {
  model: shape({
    blocks: arrayOf(
      shape({
        locator: string,
        blocks: arrayOf(
          // raw video
          shape({
            model: shape({
              isLive: bool,
              duration: string,
              locator: string,
            }),
          }),
          // alt text
          shape(textPropTypes),
          // image
          shape(imagePropTypes),
        ),
      }),
    ),
  }),
};

const blockPropTypes = model => ({
  blockId: string,
  type: string,
  model: shape(model),
});

const headlinePropTypes = {
  blocks: arrayOf(
    shape(textPropTypes),
  ),
};

export const mainContentPropTypes = {
  blocks: arrayOf(
    shape(blockPropTypes(headlinePropTypes)),
    shape(blockPropTypes(textPropTypes)),
  ).isRequired,
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
