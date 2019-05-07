import { arrayOf, bool, shape, string } from 'prop-types';
import { textBlockPropTypes } from './text';
import { imageBlockPropTypes } from './image';

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
        shape(imageBlockPropTypes),
      ),
    }),
  ).isRequired,
};

const videoMetadata = {
  video: shape({
    '@list': arrayOf(
      shape({
        '@type': string,
        description: string,
        duration: string,
        name: string,
        thumbnailUrl: string,
        uploadDate: string,
      }),
    ),
  }),
};

export const videoComponentPropTypes = {
  duration: string,
  imageLocator: string,
  kind: string,
  rawImageSrc: string,
  versionID: string,
  videoLocator: string,
  metadata: shape(videoMetadata),
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

// this is a temp default prop until Image and Video can be moved to using the new approach to prop type definition
export const emptyBlockArrayDefaultProps = {
  blocks: [
    {
      model: {},
    },
  ],
};

export const imageDefaultPropTypes = baseDefaultPropTypes;

export const textDefaultPropTypes = {
  blocks: [baseDefaultPropTypes],
};
