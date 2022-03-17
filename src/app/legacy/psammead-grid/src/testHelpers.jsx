import React from 'react';
import { string } from 'prop-types';
import styled from '@emotion/styled';
import Paragraph from '@bbc/psammead-paragraph';
import { cyrillicAndLatin } from '@bbc/gel-foundations/scripts';
import Image from '@bbc/psammead-image';
import { GEL_SPACING_HLF, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import MediaIndicator from '@bbc/psammead-media-indicator';

export const ExampleParagraph = ({ identifier }) => (
  <Paragraph script={cyrillicAndLatin} service="news">
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
    'https://ichef.bbci.co.uk/news/[WIDTH]/cpsprodpb/11897/production/_106613817_999_al_.jpg';

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

export const ExampleMediaIndicator = styled(MediaIndicator)``;

export const ExampleTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

ExampleParagraph.propTypes = {
  identifier: string,
};
ExampleParagraph.defaultProps = {
  identifier: '1',
};
