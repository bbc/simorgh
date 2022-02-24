import React, { useContext } from 'react';
import {
  arrayOf,
  shape,
  string,
  oneOfType,
  object,
  func,
  bool,
} from 'prop-types';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifBold } from '@bbc/psammead-styles/font-styles';
import { C_GREY_6, C_GREY_8, C_WHITE } from '@bbc/psammead-styles/colours';
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
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';

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
  background-color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    width: 14.8125rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 11.125rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 12.6875rem;
  }
`;

const OperaPromoBox = styled.div`
  background-color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
  width: calc(100% - ${GEL_SPACING});
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% - ${GEL_SPACING_DBL});
  }
`;

const Promo = ({ block, onClick, isRecommendationType }) => {
  const { script, service } = useContext(ServiceContext);

  const textBlock = isRecommendationType
    ? block
    : filterForBlockType(pathOr({}, ['model', 'blocks'], block), 'text');
  const href = isRecommendationType
    ? pathOr('', ['locators', 'assetUri'], textBlock)
    : pathOr(
        '',
        ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
        textBlock,
      );
  const title = isRecommendationType
    ? pathOr('', ['headlines', 'headline'], textBlock)
    : pathOr(
        '',
        ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
        textBlock,
      );

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
    model: shape({
      blocks: arrayOf(oneOfType([string, object])),
    }).isRequired,
  }).isRequired,
  onClick: func.isRequired,
  isRecommendationType: bool.isRequired,
};

export default Promo;
