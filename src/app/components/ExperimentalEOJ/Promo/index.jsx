import React, { useContext } from 'react';
import { shape, string, func } from 'prop-types';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifBold } from '@bbc/psammead-styles/font-styles';
import { C_GREY_2, C_GREY_6, C_GREY_8 } from '@bbc/psammead-styles/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';

const CARDS_COLOR = C_GREY_2;

const Link = styled.a`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSerifBold(service)}
  width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  color: ${C_GREY_8};
  &:visited {
    color: ${C_GREY_6};
  }
`;

const PromoBox = styled.div`
  background-color: ${CARDS_COLOR};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    width: 14.8rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 11.1rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 12.6rem;
  }
`;

const OperaPromoBox = styled.div`
  background-color: ${CARDS_COLOR};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
  width: calc(100% - ${GEL_SPACING});
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% - ${GEL_SPACING_DBL});
  }
`;

const Promo = ({ block, onClick }) => {
  const { script, service } = useContext(ServiceContext);
  const href = path(['locators', 'assetUri'], block);

  const title = path(['headlines', 'headline'], block);

  const isOperaMini = useOperaMiniDetection();

  const WrapperPromoBox = isOperaMini ? OperaPromoBox : PromoBox;

  return (
    <WrapperPromoBox>
      <Link href={href} service={service} script={script} onClick={onClick}>
        {title}
      </Link>
    </WrapperPromoBox>
  );
};

Promo.propTypes = {
  block: shape({
    headlines: shape({ headline: string.isRequired }),
    locators: shape({ assetUri: string.isRequired }),
  }).isRequired,
  onClick: func.isRequired,
};

export default Promo;
