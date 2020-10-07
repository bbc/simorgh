import React, { useContext } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import {
  GEL_SPACING_QUAD,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

const paddingDir = ({ dir }) => `padding-${dir === 'rtl' ? 'left' : 'right'}`;

const ImageContainer = styled.div`
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_TRPL};
  ${paddingDir}: ${GEL_SPACING_DBL};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    display: none;
  }
`;

const getSrc = ({ imageUrl, size }) =>
  `https://${imageUrl.replace('$recipe', `${size}x${size}`)}`;

const getSrcSet = ({ imageUrl, sizes }) =>
  sizes.map(size => `${getSrc({ imageUrl, size })} ${size}w`).join(',');

const smallImageSize = 128;
const mediumImageSize = 240;
const largeImageSize = 480;

const OnDemandImage = ({ imageUrl, dir }) => {
  const { defaultImageAltText: alt } = useContext(ServiceContext);

  const src = getSrc({ imageUrl, size: smallImageSize });
  const srcset = getSrcSet({
    imageUrl,
    sizes: [smallImageSize, mediumImageSize, largeImageSize],
  });
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return (
    <ImageContainer dir={dir}>
      <ImageWithPlaceholder
        src={src}
        alt={alt}
        srcset={srcset}
        sizes={sizes}
        ratio={100}
        width={mediumImageSize}
        height={mediumImageSize}
      />
    </ImageContainer>
  );
};

OnDemandImage.propTypes = {
  imageUrl: string.isRequired,
  dir: string,
};

OnDemandImage.defaultProps = {
  dir: 'ltr',
};

export default OnDemandImage;
