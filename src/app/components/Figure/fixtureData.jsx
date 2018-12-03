import React from 'react';
import FigureContainer from '../../containers/Figure';
import { ServiceContext } from '../../contexts/ServiceContext';

const imageAlt = 'Pauline Clayton';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/E7DB/production/_101655395_paulineclayton.jpg';
const imageRatio = 56.25;
const captionValue = 'This is a caption';
const copyrightText = 'Getty Images';

const serviceContextStubNews = {
  imageCaptionOffscreenText: 'Image caption, ',
};

const generateFixtureData = (caption, copyright) => (
  <ServiceContext.Provider value={serviceContextStubNews}>
    <FigureContainer
      src={imageSrc}
      alt={imageAlt}
      ratio={imageRatio}
      caption={caption}
      copyright={copyright}
    />
  </ServiceContext.Provider>
);

export const FigureImage = generateFixtureData();

export const FigureImageWithCaption = generateFixtureData(captionValue);

export const FigureImageWithCopyright = generateFixtureData(
  null,
  copyrightText,
);

export const FigureImageWithCopyrightAndCaption = generateFixtureData(
  captionValue,
  copyrightText,
);
