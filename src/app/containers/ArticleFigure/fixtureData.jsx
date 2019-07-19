import React from 'react';
import { any, bool, string, number, objectOf } from 'prop-types';
import FigureContainer from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { blockContainingText } from '../../models/blocks';

const imageAlt = 'Pauline Clayton';
const imageHeight = 360;
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const imageWidth = 640;
const imageRatio = 56.25;
const captionBlock = text => blockContainingText('caption', text);

const createCaptionBlock = arrayOfBlocks => {
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
  arrayOfBlocks.forEach(block => {
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
};

const paragraphBlockWithBoldAndItalics = {
  type: 'paragraph',
  model: {
    text: 'This is a second paragraph with italics and bold and bold italics',
    blocks: [
      {
        type: 'fragment',
        model: {
          text: 'This is a second paragraph with ',
          attributes: [],
        },
      },
      {
        type: 'fragment',
        model: {
          text: 'italics',
          attributes: ['italic'],
        },
      },
      {
        type: 'fragment',
        model: {
          text: ' and ',
          attributes: [],
        },
      },
      {
        type: 'fragment',
        model: {
          text: 'bold',
          attributes: ['bold'],
        },
      },
      {
        type: 'fragment',
        model: {
          text: ' and ',
          attributes: [],
        },
      },
      {
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
  paragraphBlockWithInlineLink,
]);

const captionBlockWithLink = createCaptionBlock([paragraphBlockWithInlineLink]);

const copyrightText = 'Getty Images';

const generateFixtureData = ({
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
      service="news"
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

generateFixtureData.propTypes = {
  caption: objectOf(any),
  copyright: string,
  lazyLoad: bool,
  platform: string,
  type: string,
  height: number,
  width: number,
  service: string,
};

generateFixtureData.defaultProps = {
  caption: null,
  copyright: null,
  lazyLoad: false,
  platform: 'canonical',
  type: '',
  height: imageHeight,
  width: imageWidth,
  service: 'news',
};

export const FigureImage = generateFixtureData({ platform: 'canonical' });

export const FigureImageWithNestedGrid = (width, height) =>
  generateFixtureData({
    platform: 'canonical',
    width,
    height,
  });

export const FigureLazyLoadImage = generateFixtureData({
  platform: 'canonical',
  lazyLoad: true,
});

export const FigureAmpImage = generateFixtureData({ platform: 'amp' });

export const FigureImageWithCaption = service =>
  generateFixtureData({
    caption: captionBlock('Figure Image With Caption'),
    platform: 'canonical',
    type: 'image',
    service,
  });

export const FigureAmpImageWithCaption = service =>
  generateFixtureData({
    caption: captionBlock('Figure Amp Image with Caption'),
    platform: 'amp',
    type: 'image',
    service,
  });

export const FigureImageWithCopyright = generateFixtureData({
  copyright: copyrightText,
  platform: 'canonical',
});

export const FigureAmpImageWithCopyright = generateFixtureData({
  copyright: copyrightText,
  platform: 'amp',
});

export const FigureImageWithCopyrightAndCaption = generateFixtureData({
  caption: captionBlock('Figure Image with Copyright and Caption'),
  copyright: copyrightText,
  platform: 'canonical',
  type: 'image',
});

export const FigureAmpImageWithCopyrightAndCaption = generateFixtureData({
  caption: captionBlock('Figure Amp Image with Copyright and Caption'),
  copyright: copyrightText,
  platform: 'amp',
  type: 'image',
});

export const FigureImageWithCaptionContainingLink = generateFixtureData({
  caption: captionBlockWithLink,
  platform: 'canonical',
  type: 'image',
});

export const FigureAmpImageWithCaptionContainingLink = generateFixtureData({
  caption: captionBlockWithLink,
  platform: 'amp',
  type: 'image',
});

export const FigureImageWithCaptionContainingMultipleParagraphsAndLink = generateFixtureData(
  {
    caption: captionBlockWithMultipleParagraphsAndLink,
    platform: 'canonical',
    type: 'image',
  },
);

export const FigureAmpImageWithCaptionContainingMultipleParagraphsAndLink = generateFixtureData(
  {
    caption: captionBlockWithMultipleParagraphsAndLink,
    platform: 'amp',
    type: 'image',
  },
);
