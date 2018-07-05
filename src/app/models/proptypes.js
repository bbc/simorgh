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

export const containerProp = {
  text: string,
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

export const commonTextPropTypes = {
  type: string,
  model: shape({
    blocks: arrayOf(
      shape({
        model: shape({
          blocks: arrayOf(
            shape({
              model: shape({
                text: string,
              }),
            }),
          ),
        }),
      }),
    ),
  }),
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

const baseDefaultPropTypes = {
  model: {
    blocks: [
      {
        model: {},
      },
    ],
  },
};

export const baseTextDefaultPropTypes = (type, text) => ({
  type,
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                text,
              },
            },
          ],
        },
      },
    ],
  },
});

export const imageDefaultPropTypes = baseDefaultPropTypes;

export const videoDefaultPropTypes = baseDefaultPropTypes;

export const textDefaultPropTypes = {
  blocks: [baseDefaultPropTypes],
};
