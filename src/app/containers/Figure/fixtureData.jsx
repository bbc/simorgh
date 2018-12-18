import React from 'react';
import FigureContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';
import { PlatformContextProvider } from '../../contexts/PlatformContext';
import { blockContainingText } from '../../models/blocks';

const imageAlt = 'Pauline Clayton';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const imageRatio = 56.25;
const height = 360;
const width = 640;
const captionBlock = blockContainingText('caption', 'This is a caption');
// The following block is quite a large and ugly thing to keep in this file, but refactoring model/blocks.js to better allow for generating fragmented data is not in scope of the current task.
const captionBlockWithLink = {
  type: 'caption',
  model: {
    blocks: [
      {
        type: 'text',
        model: {
          blocks: [
            {
              type: 'paragraph',
              model: {
                text: 'This is a caption containing an inline link.',
                blocks: [
                  {
                    type: 'fragment',
                    model: {
                      text: 'This is a caption ',
                      attributes: [],
                    },
                  },
                  {
                    type: 'urlLink',
                    model: {
                      text: 'containing an inline link',
                      locator: 'https://www.bbc.com',
                      blocks: [
                        {
                          type: 'fragment',
                          model: {
                            text: 'containing an inline link',
                            attributes: [],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: 'fragment',
                    model: {
                      text: '.',
                      attributes: [],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
};
const copyrightText = 'Getty Images';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const platformContextCanonical = 'canonical';

const generateFixtureData = (caption, copyright) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <PlatformContextProvider platform={platformContextCanonical}>
      <FigureContainer
        src={imageSrc}
        alt={imageAlt}
        ratio={imageRatio}
        captionBlock={caption}
        copyright={copyright}
        height={height}
        width={width}
      />
    </PlatformContextProvider>
  </ServiceContext.Provider>
);

export const FigureImage = generateFixtureData();

export const FigureImageWithCaption = generateFixtureData(captionBlock);

export const FigureImageWithCopyright = generateFixtureData(
  null,
  copyrightText,
);

export const FigureImageWithCopyrightAndCaption = generateFixtureData(
  captionBlock,
  copyrightText,
);

export const FigureImageWithCaptionContainingLink = generateFixtureData(
  captionBlockWithLink,
  null,
);
