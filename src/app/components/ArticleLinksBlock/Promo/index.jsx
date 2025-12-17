import { use } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
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
import { ServiceContext } from '../../../contexts/ServiceContext';

const StyledLink = styled(Link)`
  ${({ theme: { fontSizes } }) => fontSizes.pica};
  ${({ theme: { fontVariants } }) => fontVariants.serifBold};
  width: 100%;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  display: -webkit-box;

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

const Promo = ({ block, clickTracker }) => {
  const { script, service, serviceDatetimeLocale } = use(ServiceContext);

  const textBlock = filterForBlockType(block?.model?.blocks || {}, 'text');
  const aresLinkBlock = filterForBlockType(
    block?.model?.blocks || {},
    'aresLink',
  );
  const timestamp = path(
    ['model', 'blocks', '0', 'model', 'timestamp'],
    aresLinkBlock,
  );
  const href =
    path(
      ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
      textBlock,
    ) || '';
  const title =
    path(
      ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
      textBlock,
    ) || '';

  const isOperaMini = useOperaMiniDetection();

  const WrapperPromoBox = isOperaMini ? OperaPromoBox : PromoBox;

  return (
    <WrapperPromoBox>
      <StyledLink
        href={href}
        service={service}
        script={script}
        {...clickTracker}
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

export default Promo;
