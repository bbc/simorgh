import React from 'react';
import FigureContainer from '../../containers/Figure';
import { ServiceContext } from '../ServiceContext';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const captionValue = 'This is a caption';
const captionValueContainingLink =
  'This is a caption [with a link](https://bbc.com/news)';
const copyrightText = 'Copyright Getty images';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const generateFixtureData = (caption, copyright) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <FigureContainer
      src={imageSrc}
      alt={imageAlt}
      caption={caption}
      copyright={copyright}
    />
  </ServiceContext.Provider>
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
