import React, { useContext } from 'react';
import styled from '@emotion/styled';

import {
  getSansRegular,
  getSerifRegular,
} from '@bbc/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';

import { ServiceContext } from '#contexts/ServiceContext';
import FrostedGlassPanel from './FrostedGlassPanel';

import ImageWithPlaceholder from '../../containers/ImageWithPlaceholder';

const Wrapper = styled.div`
  display: inline-block;
  width: 300px;
`;

const Typo = styled.div`
  ${({ service }) => service && getSerifRegular(service)}
  color: white;

  font-size: 0.9375rem;
  line-height: 1.33;
  padding: 0.625rem ${GEL_SPACING} 0 ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 1rem;
    line-height: 1.25;
    padding: 0.875rem ${GEL_SPACING_DBL} 0 ${GEL_SPACING_DBL};
  }
`;

const Meta = styled.div`
  ${({ service }) => service && getSansRegular(service)}
  color: white;

  font-size: 0.8125rem;
  padding: 0.625rem ${GEL_SPACING} ${GEL_SPACING_DBL} ${GEL_SPACING};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    font-size: 0.875rem;
    padding: 0.625rem ${GEL_SPACING_DBL} ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
  }
`;

const FrostedGlassPromo = ({ image, children, meta }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <Wrapper>
      <ImageWithPlaceholder
        src={image}
        alt=""
        width="100%"
        ratio={56.25}
        darkMode
      />
      <FrostedGlassPanel image={image}>
        <Typo script={script} service={service}>
          {children}
        </Typo>
        <Meta script={script} service={service}>
          {meta}
        </Meta>
      </FrostedGlassPanel>
    </Wrapper>
  );
};

export default FrostedGlassPromo;
