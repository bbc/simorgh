import { arrayOf, bool, oneOfType, shape, string } from 'prop-types';
import { textBlockPropTypes } from './text';

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
          model: shape(textBlockPropTypes).isRequired,
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
        shape(textBlockPropTypes),
        // image
        shape(imagePropTypes),
      ),
    }),
  ).isRequired,
};

export const videoComponentPropTypes = {
  duration: string,
  imageLocator: string,
  kind: string,
  rawImageSrc: string,
  versionID: string,
  videoLocator: string,
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
