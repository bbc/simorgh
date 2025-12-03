import React from 'react';
import styled from '@emotion/styled';
import Paragraph from '#psammead/psammead-paragraph/src';
import Image from '#psammead/psammead-image/src';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import latin from '../../../../components/ThemeProvider/fontScripts/latin';

export const ExampleParagraph = ({ identifier = '1' }) => (
  <Paragraph script={latin} service="news">
    {identifier}This is a long paragraph that will wrap for several lines. This
    is a long paragraph that will wrap for several lines. This is a long
    paragraph that will wrap for several lines. This is a long paragraph that
    will wrap for several lines. This is a long paragraph that will wrap for
    several lines. This is a long paragraph that will wrap for several lines.
    This is a long paragraph that will wrap for several lines. This is a long
    paragraph that will wrap for several lines.
  </Paragraph>
);

export const ExampleFigure = styled.figure`
  margin: 0;
  padding: 0;
`;

const ImageSpacing = styled.div`
  margin: 0;
  padding: 0 0 ${GEL_SPACING} 0;
`;

export const ExampleImage = () => {
  const imageSizes = [300, 450, 600, 1024];
  const imageSrc =
    'https://ichef.bbci.co.uk/ace/ws/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

  return (
    <ImageSpacing>
      <Image
        alt="Robert Downey Junior in Iron Man"
        src={imageSrc.replace('[WIDTH]', 660)}
        width="640"
        srcset={imageSizes
          .map(size => `${imageSrc.replace('[WIDTH]', size)}.webp ${size}w`)
          .join(', ')}
        fallbackSrcset={imageSizes
          .map(size => `${imageSrc.replace('[WIDTH]', size)} ${size}w`)
          .join(', ')}
        primaryMimeType="image/webp"
        fallbackMimeType="image/jpeg"
      />
    </ImageSpacing>
  );
};

export const ExampleMediaIndicator = MediaIndicator;

export const ExampleTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;
