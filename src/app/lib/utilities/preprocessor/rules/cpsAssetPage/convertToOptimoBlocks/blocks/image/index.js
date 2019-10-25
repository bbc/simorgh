import { getImageParts } from './helpers';

const captionBlock = ({ caption }) => {
  if (!caption) return null;

  return {
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        attributes: [],
                        text: caption,
                      },
                      type: 'fragment',
                    },
                  ],
                  text: caption,
                },
                type: 'paragraph',
              },
            ],
          },
          type: 'text',
        },
      ],
    },
    type: 'caption',
  };
};

const altTextBlock = ({ altText }) => {
  if (!altText) return null;

  return {
    model: {
      blocks: [
        {
          model: {
            blocks: [
              {
                model: {
                  blocks: [
                    {
                      model: {
                        attributes: [],
                        text: altText,
                      },
                      type: 'fragment',
                    },
                  ],
                  text: altText,
                },
                type: 'paragraph',
              },
            ],
          },
          type: 'text',
        },
      ],
    },
    type: 'altText',
  };
};

const rawImage = ({ copyrightHolder, height, path, width }) => {
  if (!path) return null;

  const [originCode, locator] = getImageParts(path);

  return {
    model: {
      copyrightHolder,
      height,
      locator,
      originCode,
      width,
    },
    type: 'rawImage',
  };
};

const convertImage = block => ({
  model: {
    blocks: [captionBlock(block), altTextBlock(block), rawImage(block)].filter(
      Boolean,
    ),
  },
  type: 'image',
});

export default convertImage;
