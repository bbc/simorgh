import React, { useContext } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Image, { AmpImg } from '@bbc/psammead-image';
import {
  GEL_SPACING_QUAD,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_1_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';

const ImageContainer = styled.div`
  padding: ${GEL_SPACING_QUAD}
    ${({ dir }) => (dir === 'ltr' ? GEL_SPACING_DBL : 0)} ${GEL_SPACING_QUAD}
    ${({ dir }) => (dir === 'ltr' ? 0 : GEL_SPACING_DBL)};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    display: none;
  }
`;

const getSrc = (imageUrl, size) =>
  `https://${imageUrl.replace('$recipe', size)}`;
const getSrcSet = imageUrl =>
  `${getSrc(imageUrl, '112x112')} 400w,${getSrc(imageUrl, '224x224')} 1008w`;

const OnDemandEpisodeImage = ({ imageUrl, dir }) => {
  const { isAmp } = useContext(RequestContext);
  const { defaultImageAltText: alt } = useContext(ServiceContext);
  const height = 224;
  const width = 224;
  const src = getSrc(imageUrl, '112x112');
  const srcset = getSrcSet(imageUrl);
  const imageProps = { src, alt, srcset };

  return (
    <ImageContainer dir={dir}>
      {isAmp ? (
        <AmpImg
          {...imageProps}
          layout="responsive"
          height={height}
          width={width}
        />
      ) : (
        <Image {...imageProps} />
      )}
    </ImageContainer>
  );
};

OnDemandEpisodeImage.propTypes = {
  imageUrl: string.isRequired,
  dir: string,
};

OnDemandEpisodeImage.defaultProps = {
  dir: 'ltr',
};

export default OnDemandEpisodeImage;
