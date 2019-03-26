import React from 'react';
import PropTypes from 'prop-types';
import FigureContainer from '.';
import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { blockContainingText } from '../../models/blocks';

const imageAlt = 'Pauline Clayton';
const imageHeight = 360;
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const imageWidth = 640;
const imageRatio = 56.25;
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
                      isExternal: false,
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

const generateFixtureData = ({ caption, copyright, platform }) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <RequestContextProvider platform={platform}>
      <FigureContainer
        alt={imageAlt}
        captionBlock={caption ? captionBlock : null}
        copyright={copyright ? copyrightText : null}
        height={imageHeight}
        ratio={imageRatio}
        src={imageSrc}
        width={imageWidth}
      />
    </RequestContextProvider>
  </ServiceContext.Provider>
);

generateFixtureData.propTypes = {
  caption: PropTypes.objectOf(PropTypes.any),
  copyright: PropTypes.string,
  platform: PropTypes.string,
};

generateFixtureData.defaultProps = {
  caption: null,
  copyright: null,
  platform: 'canonical',
};

export const FigureImage = generateFixtureData({});

export const FigureAmpImage = generateFixtureData({ platform: 'amp' });

export const FigureImageWithCaption = generateFixtureData({
  caption: captionBlock,
});

export const FigureAmpImageWithCaption = generateFixtureData({
  caption: captionBlock,
  platform: 'amp',
});

export const FigureImageWithCopyright = generateFixtureData({
  copyright: copyrightText,
});

export const FigureAmpImageWithCopyright = generateFixtureData({
  copyright: copyrightText,
  platform: 'amp',
});

export const FigureImageWithCopyrightAndCaption = generateFixtureData({
  caption: captionBlock,
  copyright: copyrightText,
});

export const FigureAmpImageWithCopyrightAndCaption = generateFixtureData({
  caption: captionBlock,
  copyright: copyrightText,
  platform: 'amp',
});

export const FigureImageWithCaptionContainingLink = generateFixtureData({
  caption: captionBlockWithLink,
});

export const FigureAmpImageWithCaptionContainingLink = generateFixtureData({
  caption: captionBlockWithLink,
  platform: 'amp',
});
