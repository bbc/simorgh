import { arrayOf, bool, oneOfType, shape, string } from 'prop-types';

export const textPropTypes = {
  blocks: arrayOf(
    shape({
      model: shape({
        blocks: arrayOf(
          shape({
            model: shape({
              text: string.isRequired,
            }).isRequired,
          }).isRequired,
        ).isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export const requiredTextProp = {
  text: string.isRequired,
};

export const optionalTextPropTypes = {
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
                text: string.isRequired,
              }),
            }),
          ),
        }),
      }),
    ),
  }),
};

export const imagePropTypes = {
  model: shape({
    blocks: arrayOf(
      oneOfType([
        // rawImage block
        shape({
          model: shape({
            locator: string.isRequired,
          }).isRequired,
        }).isRequired,
        // altText block
        shape({
          model: shape(textPropTypes).isRequired,
        }).isRequired,
        // caption block
        shape({
          model: shape(optionalTextPropTypes),
        }),
      ]).isRequired,
    ).isRequired,
  }).isRequired,
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
              locator: string.isRequired,
            }),
          }),
          // alt text
          shape(textPropTypes),
          // image
          shape(imagePropTypes),
        ),
      }),
    ).isRequired,
  }).isRequired,
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

export const baseTextDefaultPropTypes = {
  type: '',
  model: {
    blocks: [
      {
        model: {
          blocks: [
            {
              model: {
                text: '',
              },
            },
          ],
        },
      },
    ],
  },
};

export const imageDefaultPropTypes = baseDefaultPropTypes;

export const videoDefaultPropTypes = baseDefaultPropTypes;

export const textDefaultPropTypes = {
  blocks: [baseDefaultPropTypes],
};
