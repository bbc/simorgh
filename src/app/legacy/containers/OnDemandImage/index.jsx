import React, { useContext } from 'react';
import is from 'ramda/src/is';
import styled from '@emotion/styled';
import {
  GEL_SPACING_QUAD,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { getMimeType } from '#lib/utilities/srcSet';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ImageWithPlaceholder from '../ImageWithPlaceholder';

const paddingDir = ({ dir }) => `padding-${dir === 'rtl' ? 'left' : 'right'}`;

const ImageContainer = styled.div`
  padding: ${GEL_SPACING_QUAD} 0 ${GEL_SPACING_TRPL};
  ${paddingDir}: ${GEL_SPACING_DBL};
  @media (max-width: 22.4375rem) {
    display: none;
  }
`;

const getSrc = ({ imageUrl, size }) =>
  imageUrl.endsWith('.webp')
    ? `https://${imageUrl.replace('$recipe', `${size}x${size}`)}`
    : `https://${imageUrl.replace('$recipe', `${size}x${size}`)}.webp`;

const getSrcSet = ({ imageUrl, sizes }) =>
  sizes.map(size => `${getSrc({ imageUrl, size })} ${size}w`).join(',');

const smallImageSize = 128;
const mediumImageSize = 256;
const largeImageSize = 480;

const OnDemandImage = ({ imageUrl, alt: altFromProps, dir = 'ltr' }) => {
  const { defaultImageAltText } = useContext(ServiceContext);

  const alt = is(String, altFromProps) ? altFromProps : defaultImageAltText;

  const src = getSrc({ imageUrl, size: mediumImageSize });
  const srcset = getSrcSet({
    imageUrl,
    sizes: [smallImageSize, mediumImageSize, largeImageSize],
  });
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return (
    <ImageContainer data-e2e="on-demand-image" dir={dir}>
      <ImageWithPlaceholder
        src={src}
        alt={alt}
        srcset={srcset}
        primaryMimeType={getMimeType(srcset)}
        sizes={sizes}
        ratio={100}
        width={mediumImageSize}
        height={mediumImageSize}
      />
    </ImageContainer>
  );
};

export default OnDemandImage;
