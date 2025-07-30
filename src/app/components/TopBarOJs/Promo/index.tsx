/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { getPica } from '#psammead/gel-foundations/src/typography';
import { getSerifBold } from '#psammead/psammead-styles/src/font-styles';
import { Link } from '#psammead/psammead-story-promo/src';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import LiveLabel from '../../LiveLabel';
import styles from './index.styles';

const StyledLink = styled(Link)`
  ${({ script }) => script && getPica(script)}
  ${({ service }) => service && getSerifBold(service)}
  width: 100%;
  text-decoration: none;

  overflow-x: hidden;
  overflow-y: hidden;

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
  display: block;
  margin-bottom: 0;
  background-color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.WHITE};
  padding: ${GEL_SPACING};
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

  @media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN}) {
    width: 11.5rem;
  }
  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 17rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 15.5rem;
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

interface PromoProps {
  block: TopStoryItem;
  eventTrackingData: EventTrackingMetadata;
}

const Promo = ({ block, eventTrackingData }: PromoProps) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const overtypedHeadline = block?.headlines?.overtyped ?? '';
  const mainHeadline = block?.headlines?.headline ?? '';
  const headlineBlockText =
    block?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
      ?.text ?? '';
  const name = block?.name ?? '';

  const title =
    overtypedHeadline ||
    mainHeadline ||
    headlineBlockText ||
    name ||
    block.headline ||
    '';

  const canonicalUrl = block?.locators?.canonicalUrl ?? '';
  const assetUri = block?.locators?.assetUri ?? '';
  const uri = block?.uri ?? '';

  const href =
    canonicalUrl ||
    assetUri ||
    uri ||
    (block.destinationUrl ? `https://www.bbc.com${block.destinationUrl}` : '');

  const { isLive } = block;

  const isOperaMini = useOperaMiniDetection();

  const promoBoxStyles = isOperaMini ? styles.operaPromoBox : styles.promoBox;

  return (
    <div css={promoBoxStyles}>
      <a css={styles.link} href={href} {...clickTrackerHandler}>
        {isLive && <LiveLabel />}
        {title}
      </a>
    </div>
  );
};

export default Promo;
