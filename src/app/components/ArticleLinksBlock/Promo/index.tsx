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

interface PromoProps {
  block: Record<string, unknown>;
  clickTracker?: Record<string, unknown>;
}

const StyledLink = styled(Link)(({ theme }) => ({
  ...theme.fontSizes.pica,
  ...theme.fontVariants.serifBold,
  width: '100%',
  textDecoration: 'none',
  overflowX: 'hidden',
  overflowY: 'hidden',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  display: '-webkit-box',
  color: theme.isDarkUi ? theme.palette.GREY_10 : theme.palette.GREY_8,
  '&:hover, &:focus': {
    textDecoration: 'underline',
  },
  '&:visited': {
    color: theme.palette.GREY_6,
  },
}));

const PromoBox = styled.div(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE,
  padding: GEL_SPACING_DBL,
  marginBottom: GEL_SPACING_TRPL,
  height: 'auto',
  [`@media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN})`]: {
    width: '14.8125rem',
  },
  [`@media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN})`]: {
    width: '11.125rem',
  },
  [`@media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`]: {
    width: '12.6875rem',
  },
}));

const OperaPromoBox = styled.div(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE,
  padding: GEL_SPACING_DBL,
  marginBottom: GEL_SPACING_DBL,
  width: `calc(100% - ${GEL_SPACING})`,
  [`@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN})`]: {
    width: `calc(100% - ${GEL_SPACING_DBL})`,
  },
}));

const TimeStamp = styled(PromoTimestamp)(({ theme }) => ({
  marginTop: GEL_SPACING,
  color: theme.isDarkUi ? theme.palette.GREY_6 : undefined,
}));

function Promo({ block, clickTracker }: PromoProps) {
  const { script, service, serviceDatetimeLocale } = use(ServiceContext);

  const textBlock = filterForBlockType(block?.model?.blocks || {}, 'text');
  const aresLinkBlock = filterForBlockType(
    block?.model?.blocks || {},
    'aresLink',
  );
  const timestamp = path(
    ['model', 'blocks', '0', 'model', 'timestamp'],
    aresLinkBlock,
  ) as number | undefined;
  const href =
    (path(
      ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'locator'],
      textBlock,
    ) as string) || '';
  const title =
    (path(
      ['model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
      textBlock,
    ) as string) || '';

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
}

export default Promo;
