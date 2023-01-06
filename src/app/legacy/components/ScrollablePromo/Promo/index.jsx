import React, { useContext } from 'react';
import { arrayOf, shape, string, oneOfType, object, func } from 'prop-types';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSerifBold } from '#psammead/psammead-styles/src/font-styles';
import {
  C_GREY_6,
  C_GREY_8,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';
import { Link } from '#psammead/psammead-story-promo/src';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import PromoTimestamp from '#components/Promo/timestamp';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const StyledLink = styled(Link)`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSerifBold(service)}
  width: 100%;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
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
  position: relative;
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
  position: relative;
  background-color: ${C_WHITE};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
  width: calc(100% - ${GEL_SPACING});
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% - ${GEL_SPACING_DBL});
  }
`;

const TimeStamp = styled(PromoTimestamp)`
  margin-top: ${GEL_SPACING};
`;

const Promo = ({ block, onClick }) => {
  const { script, service, serviceDatetimeLocale } = useContext(ServiceContext);
  const textBlock = filterForBlockType(
    pathOr({}, ['model', 'blocks'], block),
    'text',
  );
  const aresLinkBlock = filterForBlockType(
    pathOr({}, ['model', 'blocks'], block),
    'aresLink',
  );
  const href = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
    textBlock,
  );
  const title = pathOr(
    '',
    ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
    textBlock,
  );
  const timestamp = path(
    ['model', 'blocks', '0', 'model', 'timestamp'],
    aresLinkBlock,
  );

  const isOperaMini = useOperaMiniDetection();

  const WrapperPromoBox = isOperaMini ? OperaPromoBox : PromoBox;

  return (
    <WrapperPromoBox>
      <StyledLink
        href={href}
        service={service}
        script={script}
        onClick={onClick}
      >
        {title}
      </StyledLink>
      {timestamp && (
        <TimeStamp serviceDatetimeLocale={serviceDatetimeLocale}>
          {timestamp}
        </TimeStamp>
      )}
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
};

export default Promo;
