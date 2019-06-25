import { arrayOf, bool, number, shape, string, oneOfType } from 'prop-types';
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

export const videoComponentPropTypes = {
  title: string.isRequired,
  id: string.isRequired,
  mediaPlayerSettings: shape({
    product: string.isRequired,
    responsive: bool.isRequired,
    statsObject: oneOfType([
      shape({ clipPID: string }),
      shape({ episodePID: string }),
    ]).isRequired,
    mediator: shape({
      host: string.isRequired,
    }).isRequired,
    playlistObject: shape({
      title: string.isRequired,
      holdingImageURL: string.isRequired,
      guidance: string,
      items: arrayOf(
        shape({
          duration: number.isRequired,
          versionID: string.isRequired,
          kind: string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
    ui: shape({
      subtitles: shape({
        defaultOn: bool.isRequired,
      }).isRequired,
      local: shape({
        lang: string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  statsAppName: string.isRequired,
  statsAppType: string.isRequired,
  statsCountername: string.isRequired,
  statsDestination: string.isRequired,
  uiLocale: string.isRequired,
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
