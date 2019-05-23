import React from 'react';
import { any, bool, string, objectOf } from 'prop-types';
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

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const generateFixtureData = ({
  caption,
  copyright,
  lazyLoad,
  platform,
  type,
}) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <RequestContextProvider
      platform={platform}
      isUK
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <FigureContainer
        alt={imageAlt}
        captionBlock={caption}
        copyright={copyright}
        height={imageHeight}
        ratio={imageRatio}
        src={imageSrc}
        width={imageWidth}
        type={type}
        lazyLoad={lazyLoad}
      />
    </RequestContextProvider>
  </ServiceContext.Provider>
);

generateFixtureData.propTypes = {
  caption: objectOf(any),
  copyright: string,
  lazyLoad: bool,
  platform: string,
  type: string,
};

generateFixtureData.defaultProps = {
  caption: null,
  copyright: null,
  lazyLoad: false,
  platform: 'canonical',
  type: '',
};

export const FigureImage = generateFixtureData({ platform: 'canonical' });

export const FigureLazyLoadImage = generateFixtureData({
  platform: 'canonical',
  lazyLoad: true,
});

export const FigureAmpImage = generateFixtureData({ platform: 'amp' });

export const FigureImageWithCaption = generateFixtureData({
  caption: captionBlock,
  platform: 'canonical',
  type: 'image',
});

export const FigureAmpImageWithCaption = generateFixtureData({
  caption: captionBlock,
  platform: 'amp',
  type: 'image',
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
  caption: captionBlock,
  copyright: copyrightText,
  platform: 'canonical',
  type: 'image',
});

export const FigureAmpImageWithCopyrightAndCaption = generateFixtureData({
  caption: captionBlock,
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
