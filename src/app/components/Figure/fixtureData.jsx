import React from 'react';
import FigureContainer from '../../containers/Figure';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const captionValue = 'This is a caption';
const captionValueContainingLink =
  'This is a caption [with a link](https://bbc.com/news)';
const copyrightText = 'Copyright Getty images';

const generateFixtureData = (hasCaption, hasCopyright, hasInlineLink) => {
  if (hasCaption && hasInlineLink) {
    return (
      <FigureContainer
        src={imageSrc}
        alt={imageAlt}
        caption={captionValueContainingLink}
      />
    );
  }

  if (hasCaption && hasCopyright) {
    return (
      <FigureContainer
        src={imageSrc}
        alt={imageAlt}
        copyright={copyrightText}
        caption={captionValue}
      />
    );
  }

  if (hasCaption) {
    return (
      <FigureContainer src={imageSrc} alt={imageAlt} caption={captionValue} />
    );
  }

  if (hasCopyright) {
    return (
      <FigureContainer
        src={imageSrc}
        alt={imageAlt}
        copyright={copyrightText}
      />
    );
  }

  return <FigureContainer src={imageSrc} alt={imageAlt} />;
};

export const FigureImage = generateFixtureData();

export const FigureImageWithCaption = generateFixtureData(true);

export const FigureImageWithCaptionContainingLink = generateFixtureData(
  true,
  false,
  true,
);

export const FigureImageWithCopyright = generateFixtureData(false, true);

export const FigureImageWithCopyrightAndCaption = generateFixtureData(
  true,
  true,
);
