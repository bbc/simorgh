import React from 'react';
import Figure from './index';
import Image from './Image';
import Caption from './Caption';
import Text from '../Text';
import VisuallyHiddenText from '../VisuallyHiddenText';

const imageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const imageSrc =
  'https://ichef.bbci.co.uk/news/640/cpsprodpb/439A/production/_100960371_syrians_and_asylum_v2-nc.png';
const captionValue = 'This is a caption';
const captionValueContainingLink =
  'This is a caption [with a link](https://bbc.com/news)';
const copyrightText = 'Copyright Getty images';

export const FigureImage = (
  <Figure>
    <Image alt={imageAlt} src={imageSrc} />
  </Figure>
);

export const FigureImageWithCaption = (
  <Figure>
    <Image alt={imageAlt} src={imageSrc} />
    <Text text={captionValue} paragraphOverride={Caption} />
  </Figure>
);

export const FigureImageWithCaptionContainingLink = (
  <Figure>
    <Image alt={imageAlt} src={imageSrc} />
    <Text text={captionValueContainingLink} paragraphOverride={Caption} />
  </Figure>
);

export const FigureImageWithCopyright = (
  <Figure>
    <Image alt={imageAlt} src={imageSrc} />
    <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
  </Figure>
);

export const FigureImageWithCopyrightAndCaption = (
  <Figure>
    <Image alt={imageAlt} src={imageSrc} />
    <VisuallyHiddenText>{copyrightText}</VisuallyHiddenText>
    <Text text={captionValue} paragraphOverride={Caption} />
  </Figure>
);
