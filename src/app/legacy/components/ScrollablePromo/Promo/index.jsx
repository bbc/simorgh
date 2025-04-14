import React, { useContext } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSerifBold } from '#psammead/psammead-styles/src/font-styles';
import { Link } from '#psammead/psammead-story-promo/src';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import PromoTimestamp from '#components/Promo/timestamp';
import LiveLabel from '../../../../components/LiveLabel';
import { ServiceContext } from '../../../../contexts/ServiceContext';

const StyledLink = styled(Link)`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSerifBold(service)}
  width: 100%;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;

  ${({ experimentVariant }) =>
    !experimentVariant &&
    ` -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      display: -webkit-box;
    `}

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_10 : theme.palette.GREY_8};
  &:visited {
    color: ${props => props.theme.palette.GREY_6};
  }
`;

const PromoBox = styled.div`
  position: relative;
  background-color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_TRPL};
  height: auto;
  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    width: 14.8125rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 11.125rem;
  }
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    width: 12.6875rem;
  }
  ${({ experimentVariant }) =>
    experimentVariant &&
    `
      display: block;
      margin-bottom: 0;
      @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
        width: 11.5rem;
      }
      @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
        width: 17rem;
      }
      @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
        width: 15.5rem;
      }
      padding: ${GEL_SPACING};
    `}
`;

const OperaPromoBox = styled.div`
  position: relative;
  background-color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE};
  padding: ${GEL_SPACING_DBL};
  margin-bottom: ${GEL_SPACING_DBL};
  width: calc(100% - ${GEL_SPACING});
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: calc(100% - ${GEL_SPACING_DBL});
  }
`;

const TimeStamp = styled(PromoTimestamp)`
  margin-top: ${GEL_SPACING};
  color: ${({ theme }) => theme.isDarkUi && theme.palette.GREY_6};
`;

const Promo = ({ block, experimentVariant, onClick }) => {
  const { script, service, serviceDatetimeLocale } = useContext(ServiceContext);
  let title;
  let href;
  let textBlock;
  let aresLinkBlock;
  let timestamp;
  let isLive;

  switch (experimentVariant) {
    case 'top_bar_top_stories': {
      const overtypedHeadline = block?.headlines?.overtyped ?? '';
      const mainHeadline = block?.headlines?.headline ?? '';
      const headlineBlockText =
        block?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
          ?.text ?? '';
      const name = block?.name ?? '';

      title =
        overtypedHeadline ||
        mainHeadline ||
        headlineBlockText ||
        name ||
        block.headline ||
        '';

      const canonicalUrl = block?.locators?.canonicalUrl ?? '';
      const assetUri = block?.locators?.assetUri ?? '';
      const uri = block?.uri ?? '';

      href =
        canonicalUrl ||
        assetUri ||
        uri ||
        (block.destinationUrl
          ? `https://www.bbc.com${block.destinationUrl}`
          : '');
      isLive = block.isLive;
      break;
    }
    case 'top_bar_most_read':
      title = block.title;
      href = block.href;
      break;
    default:
      textBlock = filterForBlockType(block?.model?.blocks || {}, 'text');
      aresLinkBlock = filterForBlockType(
        block?.model?.blocks || {},
        'aresLink',
      );
      timestamp = path(
        ['model', 'blocks', '0', 'model', 'timestamp'],
        aresLinkBlock,
      );
      href =
        path(
          ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
          textBlock,
        ) || '';
      title =
        path(
          ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
          textBlock,
        ) || '';
      break;
  }

  const isOperaMini = useOperaMiniDetection();

  const WrapperPromoBox = isOperaMini ? OperaPromoBox : PromoBox;

  return (
    <WrapperPromoBox experimentVariant={experimentVariant}>
      <StyledLink
        href={href}
        service={service}
        script={script}
        onClick={onClick}
        experimentVariant={experimentVariant}
      >
        {isLive && <LiveLabel />}
        {title}
      </StyledLink>
      {timestamp && !experimentVariant && (
        <TimeStamp
          serviceDatetimeLocale={serviceDatetimeLocale}
          data-testid="timestamp"
        >
          {timestamp}
        </TimeStamp>
      )}
    </WrapperPromoBox>
  );
};

export default Promo;
