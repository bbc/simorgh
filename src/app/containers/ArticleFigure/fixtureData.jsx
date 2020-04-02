import React from 'react';
import { any, bool, string, number, objectOf } from 'prop-types';
import FigureContainer from '.';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { blockContainingText } from '#models/blocks';

const imageAlt = 'Pauline Clayton';
const imageHeight = 360;
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const imageWidth = 640;
const imageRatio = 56.25;
const captionBlock = (text) => blockContainingText('caption', text, 'mock-id');

const createCaptionBlock = (arrayOfBlocks) => {
  const captionBlockSkeleton = {
    type: 'caption',
    model: {
      blocks: [
        {
          type: 'text',
          model: {
            blocks: [],
          },
        },
      ],
    },
  };
  arrayOfBlocks.forEach((block) => {
    captionBlockSkeleton.model.blocks[0].model.blocks.push(block);
  });
  return captionBlockSkeleton;
};

const paragraphBlockWithInlineLink = {
  type: 'paragraph',
  model: {
    text: 'This is a caption containing an inline link.',
    blocks: [
      {
        id: 1,
        type: 'fragment',
        model: {
          text: 'This is a caption ',
          attributes: [],
        },
      },
      {
        id: 2,
        type: 'urlLink',
        model: {
          text: 'containing an inline link',
          locator: 'https://www.bbc.com',
          isExternal: false,
          blocks: [
            {
              id: 22,
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
        id: 3,
        type: 'fragment',
        model: {
          text: '.',
          attributes: [],
        },
      },
    ],
  },
};

const paragraphBlockWithBoldAndItalics = {
  type: 'paragraph',
  model: {
    text: 'This is a second paragraph with italics and bold and bold italics',
    blocks: [
      {
        id: 4,
        type: 'fragment',
        model: {
          text: 'This is a second paragraph with ',
          attributes: [],
        },
      },
      {
        id: 5,
        type: 'fragment',
        model: {
          text: 'italics',
          attributes: ['italic'],
        },
      },
      {
        id: 6,
        type: 'fragment',
        model: {
          text: ' and ',
          attributes: [],
        },
      },
      {
        id: 7,
        type: 'fragment',
        model: {
          text: 'bold',
          attributes: ['bold'],
        },
      },
      {
        id: 8,
        type: 'fragment',
        model: {
          text: ' and ',
          attributes: [],
        },
      },
      {
        id: 9,
        type: 'fragment',
        model: {
          text: 'bold italics',
          attributes: ['bold', 'italic'],
        },
      },
    ],
  },
};

const captionBlockWithMultipleParagraphsAndLink = createCaptionBlock([
  paragraphBlockWithInlineLink,
  paragraphBlockWithBoldAndItalics,
  captionBlock('One of mutiple captions within a paragraph'),
]);

const captionBlockWithLink = createCaptionBlock([paragraphBlockWithInlineLink]);

const copyrightText = 'Getty Images';

const GenerateFixtureData = ({
  height,
  width,
  caption,
  copyright,
  lazyLoad,
  platform,
  type,
  service,
}) => (
  <ServiceContextProvider service={service || 'news'}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pageType="article"
      pathname="/pathname"
      service="news"
      statusCode={200}
    >
      <FigureContainer
        alt={imageAlt}
        captionBlock={caption}
        copyright={copyright}
        height={height}
        ratio={imageRatio}
        src={imageSrc}
        width={width}
        type={type}
        lazyLoad={lazyLoad}
        showCopyright
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

GenerateFixtureData.propTypes = {
  caption: objectOf(any),
  copyright: string,
  lazyLoad: bool,
  platform: string,
  type: string,
  height: number,
  width: number,
  service: string,
};

GenerateFixtureData.defaultProps = {
  caption: null,
  copyright: null,
  lazyLoad: false,
  platform: 'canonical',
  type: '',
  height: imageHeight,
  width: imageWidth,
  service: 'news',
};

export const FigureImage = <GenerateFixtureData platform="canonical" />;

export const FigureImageWithNestedGrid = (width, height) => (
  <GenerateFixtureData platform="canonical" width={width} height={height} />
);

export const FigureLazyLoadImage = (
  <GenerateFixtureData platform="canonical" lazyLoad />
);

export const FigureAmpImage = <GenerateFixtureData platform="amp" />;

export const FigureImageWithCaption = (service) => (
  <GenerateFixtureData
    platform="canonical"
    type="image"
    caption={captionBlock('Figure Image With Caption')}
    service={service}
  />
);

export const FigureAmpImageWithCaption = (service) => (
  <GenerateFixtureData
    platform="amp"
    type="image"
    caption={captionBlock('Figure Amp Image with Caption')}
    service={service}
  />
);

export const FigureImageWithCopyright = (
  <GenerateFixtureData platform="canonical" copyright={copyrightText} />
);

export const FigureAmpImageWithCopyright = (
  <GenerateFixtureData platform="amp" copyright={copyrightText} />
);

export const FigureImageWithCopyrightAndCaption = (
  <GenerateFixtureData
    platform="canonical"
    type="image"
    copyright={copyrightText}
    caption={captionBlock('Figure Image with Copyright and Caption')}
  />
);

export const FigureAmpImageWithCopyrightAndCaption = (
  <GenerateFixtureData
    platform="amp"
    type="image"
    caption={captionBlock('Figure Amp Image with Copyright and Caption')}
    copyright={copyrightText}
  />
);

export const FigureImageWithCaptionContainingLink = (
  <GenerateFixtureData
    platform="canonical"
    type="image"
    caption={captionBlockWithLink}
  />
);

export const FigureAmpImageWithCaptionContainingLink = (
  <GenerateFixtureData
    platform="amp"
    type="image"
    caption={captionBlockWithLink}
  />
);

export const FigureImageWithCaptionContainingMultipleParagraphsAndLink = (
  <GenerateFixtureData
    platform="canonical"
    type="image"
    caption={captionBlockWithMultipleParagraphsAndLink}
  />
);

export const FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink = (
  <GenerateFixtureData
    platform="amp"
    type="image"
    caption={captionBlockWithMultipleParagraphsAndLink}
  />
);
