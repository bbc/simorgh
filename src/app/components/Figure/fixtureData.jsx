import React from 'react';
import FigureContainer from '../../containers/Figure';

const imageAlt = 'Pauline Clayton';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/A933/production/_101651334_bouquet_pa.jpg';
const imageRatio = 56.25;
const captionValue = 'This is a caption';
const captionValueContainingLink =
  'This is a caption [with a link](https://bbc.com/news)';
const copyrightText = 'Getty Images';

const generateFixtureData = (caption, copyright) => (
  <FigureContainer
    src={imageSrc}
    alt={imageAlt}
    ratio={imageRatio}
    caption={caption}
    copyright={copyright}
  />
);

export const FigureImage = generateFixtureData();

export const FigureImageWithCaption = generateFixtureData(captionValue);

export const FigureImageWithCaptionContainingLink = generateFixtureData(
  captionValueContainingLink,
);

export const FigureImageWithCopyright = generateFixtureData(
  null,
  copyrightText,
);

export const FigureImageWithCopyrightAndCaption = generateFixtureData(
  captionValue,
  copyrightText,
);
