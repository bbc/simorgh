import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_QUIN,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  getPica,
  getBrevier,
  getLongPrimer,
  getGreatPrimer,
} from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContext } from '#app/contexts/RequestContext';
import { FORCED_COLOURS } from '#app/components/ThemeProvider/mediaQueries';
import { ServiceContext } from '../../../contexts/ServiceContext';
import PromoComponent from './components';
import getPromo from './shared';

const GEL_GROUP_1_WIDTH_260PX = '16.25rem';
const GEL_GROUP_1_WIDTH_320PX = '20rem';
const GEL_GROUP_1_WIDTH_360PX = '22.5rem';

const ResponsivePodcastPromoWrapper = styled.div`
  ${({ dir }) => (dir === 'rtl' ? 'float: left;' : 'float: right;')}

  margin: 0  ${GEL_SPACING} ${GEL_SPACING_TRPL};
  height: auto;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 45%;
    margin: ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin: ${GEL_SPACING_HLF} ${GEL_SPACING_DBL} ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-inline: ${GEL_SPACING_DBL} 0;
    direction: ${({ dir }) => dir};
  }
`;

const StyledPromoComponent = styled(PromoComponent)`
  padding: 0;
  ${FORCED_COLOURS} {
    border: 0.1875rem solid transparent;
  }
`;

const StyledImageWrapper = styled(PromoComponent.Card.ImageWrapper)`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    display: none;
  }
`;

const StyledCardContentWrapper = styled(PromoComponent.Card.Content)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING_HLF_TRPL};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    padding: 0 ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
  }
`;

const StyledCardDescriptionWrapper = styled(PromoComponent.Card.Description)`
  ${({ script }) => getBrevier(script)}
  margin: ${GEL_SPACING_HLF_TRPL} 0;
  overflow-wrap: break-word;
  color: ${props => props.theme.palette.GREY_10};
  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin: ${GEL_SPACING_DBL} 0;
  }
`;

const StyledEpisodeTextWrapper = styled(PromoComponent.Card.EpisodesText)`
  ${({ script }) => getBrevier(script)}

  color: ${props => props.theme.palette.GREY_10};

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_320PX}) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_360PX}) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ script }) => getLongPrimer(script)}
    margin: 0 ${GEL_SPACING_HLF};
  }
`;

const StyledCardLink = styled(PromoComponent.Card.Link)`
  ${({ script }) => getGreatPrimer(script)}
  ${({ service }) => getSerifMedium(service)}
  display: block;
  margin-top: ${GEL_SPACING_HLF_TRPL};
  color: ${props => props.theme.palette.GREY_10};
  &:visited {
    color: ${props => props.theme.palette.GREY_6};
  }
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
  }
  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin-top: ${GEL_SPACING_DBL};
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ script }) => getPica(script)}
  }
`;

const StyledPodcastIconWrapper = styled.div`
  position: absolute;
  float: bottom;
  transform: translateY(-100%);
  background-color: ${props =>
    props.isOptimo ? props.theme.palette.WHITE : props.theme.palette.GREY_2};
  display: flex;
  align-items: center;
  padding: ${GEL_SPACING} ${GEL_SPACING};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    position: relative;
    transform: translateY(${GEL_SPACING_HLF_TRPL});
    margin: ${GEL_SPACING_HLF_TRPL} ${GEL_SPACING};
    width: ${GEL_SPACING_QUIN};
  }
`;

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);
  const { pageType, isLite } = useContext(RequestContext);

  const {
    podcastPromoTitle,
    podcastBrandTitle,
    description,
    imgSrc,
    alt,
    url,
    label,
    showPromo,
    eventTrackingData,
    sizes,
    srcset,
    primaryMimeType,
  } = getPromo(podcastPromo);

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  if (isLite) return null;
  if (!showPromo) return null;

  const { text, endTextVisuallyHidden } = pathOr(
    {
      text: 'Skip podcast promotion and continue reading',
      endTextVisuallyHidden: 'End of podcast promotion',
    },
    ['skipLink'],
    podcastPromo,
  );

  // Skip podcast promotion
  const terms = {
    '%title%': podcastPromoTitle,
  };

  return (
    <ResponsivePodcastPromoWrapper ref={viewTrackerRef} dir={dir}>
      <StyledPromoComponent
        script={script}
        service={service}
        role="region"
        aria-labelledby="podcast-promo"
      >
        <SkipLinkWrapper
          endTextId="end-of-podcasts"
          terms={terms}
          text={text}
          endTextVisuallyHidden={endTextVisuallyHidden}
          service={service}
        >
          <PromoComponent.Card inlinePromo isOptimo={pageType === ARTICLE_PAGE}>
            <StyledImageWrapper>
              <ImageWithPlaceholder
                src={imgSrc}
                srcset={srcset}
                primaryMimeType={primaryMimeType}
                sizes={sizes}
                alt={alt}
                height={100}
                width={100}
                ratio={100}
                lazyLoad
              />
            </StyledImageWrapper>
            <StyledPodcastIconWrapper
              className="podcastIconWrapper"
              isOptimo={pageType === ARTICLE_PAGE}
            >
              {mediaIcons.podcast}
            </StyledPodcastIconWrapper>
            <StyledCardContentWrapper>
              <strong>
                <StyledCardLink
                  href={url}
                  onClick={clickTrackerRef}
                  script={script}
                  service={service}
                >
                  <span
                    id="podcast-promo"
                    className="podcast-promo--hover podcast-promo--focus podcast-promo--visited"
                  >
                    {podcastBrandTitle}
                  </span>
                </StyledCardLink>
              </strong>
              <StyledCardDescriptionWrapper script={script}>
                {description}
              </StyledCardDescriptionWrapper>
              <StyledEpisodeTextWrapper dir={dir} script={script}>
                {label}
              </StyledEpisodeTextWrapper>
            </StyledCardContentWrapper>
          </PromoComponent.Card>
        </SkipLinkWrapper>
      </StyledPromoComponent>
    </ResponsivePodcastPromoWrapper>
  );
};

export default Promo;
