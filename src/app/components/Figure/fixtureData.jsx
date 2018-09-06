import React from 'react';
import Figure from './index';
import Image from './Image';
import Caption from './Caption';
import Copyright from './Copyright';
import ImageWrapper from './ImageWrapper';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const captionValue = 'This is a caption';
const copyrightText = 'Getty Images';

export const FigureImage = (
  <Figure>
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
    </ImageWrapper>
  </Figure>
);

export const FigureImageWithCaption = (
  <Figure>
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
    </ImageWrapper>
    <Caption>{captionValue}</Caption>
  </Figure>
);

export const FigureImageWithCopyright = (
  <Figure>
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
      <Copyright>{copyrightText}</Copyright>
    </ImageWrapper>
  </Figure>
);

export const FigureImageWithCopyrightAndCaption = (
  <Figure>
    <ImageWrapper>
      <Image alt={imageAlt} src={imageSrc} />
      <Copyright>{copyrightText}</Copyright>
    </ImageWrapper>
    <Caption>{captionValue}</Caption>
  </Figure>
);
