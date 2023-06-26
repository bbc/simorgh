import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
  GEL_SPACING_HLF_TRPL,
  GEL_SPACING_SEXT,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  getPica,
  getBrevier,
  getLongPrimer,
} from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { ServiceContext } from '../../../contexts/ServiceContext';
import PromoComponent from './components';
import getPromo from './shared';

const GEL_GROUP_1_WIDTH_260PX = '16.25rem';
const GEL_GROUP_1_WIDTH_320PX = '20rem';
const GEL_GROUP_1_WIDTH_360PX = '22.5rem';

const ResponsivePodcastPromoWrapper = styled.div`
  ${({ dir }) => (dir === 'ltr' ? 'float: left;' : 'float: right;')}

  margin: ${GEL_SPACING_DBL} ${GEL_SPACING};
  height: auto;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 45%;
    margin: ${GEL_SPACING_HLF} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin-top: ${GEL_SPACING_HLF};
    margin-bottom: ${GEL_SPACING};
    margin-right: ${({ dir }) =>
      dir === 'ltr' ? GEL_SPACING_DBL : GEL_SPACING};
    margin-left: ${({ dir }) =>
      dir === 'ltr' ? GEL_SPACING : GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-right: ${({ dir }) =>
      dir === 'ltr' ? GEL_SPACING_DBL : GEL_SPACING_TRPL};
    margin-left: ${({ dir }) =>
      dir === 'ltr' ? GEL_SPACING_DBL : GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_HLF};
    margin-bottom: ${GEL_SPACING_HLF_TRPL};
    margin-right: ${({ dir }) => (dir === 'ltr' ? GEL_SPACING_TRPL : '0rem')};
    margin-left: ${({ dir }) => (dir === 'ltr' ? '0rem' : GEL_SPACING_TRPL)};
  }
`;

const StyledPromoComponent = styled(PromoComponent)`
  padding: 0rem;
`;

const StyledImageWrapper = styled(PromoComponent.Card.ImageWrapper)`
  display: block;
  width: 100%;
  margin: 0rem;
  padding: 0rem;
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    display: none;
  }
`;

const StyledCardContentWrapper = styled(PromoComponent.Card.Content)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING_DBL} ${GEL_SPACING_DBL} ${GEL_SPACING_DBL};
  }
`;

const StyledCardDescriptionWrapper = styled(PromoComponent.Card.Description)`
  margin: ${GEL_SPACING} 0;
  overflow-wrap: break-word;
`;

const StyledEpisodeTextWrapper = styled(PromoComponent.Card.EpisodesText)`
  ${({ script }) => getBrevier(script)}
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
  ${({ script }) => getLongPrimer(script)}
  ${({ service }) => getSerifMedium(service)}
  display: block;
  margin-top: ${GEL_SPACING_DBL};
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin-top: 0rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ script }) => getPica(script)}
  }
`;

const StyledPodcastIconWrapper = styled.div`
  position: absolute;
  float: bottom;
  transform: translateY(-100%);
  background-color: white;
  height: ${GEL_SPACING_QUIN};
  width: ${GEL_SPACING_QUIN};
  display: flex;
  align-items: center;

  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    position: relative;
    transform: translateY(${GEL_SPACING});
    margin: ${GEL_SPACING} ${GEL_SPACING};
    background-color: pink;
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    background-color: green;
  }

  @media (min-width: 318px) {
    background-color: pink;
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    background-color: blue;
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    background-color: yellow;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    background-color: red;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    background-color: cyan;
  }
`;

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);

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

  if (!showPromo) {
    return null;
  }

  const { text, endTextVisuallyHidden } = pathOr(
    {
      text: 'Skip %title% and continue reading',
      endTextVisuallyHidden: 'End of %title%',
    },
    ['skipLink'],
    podcastPromo,
  );

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
          <PromoComponent.Card inlinePromo>
            <StyledImageWrapper>
              <ImageWithPlaceholder
                src={imgSrc}
                srcset={srcset}
                primaryMimeType={primaryMimeType}
                sizes={sizes}
                alt={alt}
                height={1}
                width={1}
                ratio={100}
                lazyLoad
              />
            </StyledImageWrapper>
            <StyledPodcastIconWrapper className="podcastIconWrapper">
              {mediaIcons.podcast}
            </StyledPodcastIconWrapper>
            <StyledCardContentWrapper>
              <StyledCardLink
                href={url}
                onClick={clickTrackerRef}
                script={script}
                service={service}
              >
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {podcastBrandTitle}
                </span>
              </StyledCardLink>
              <StyledCardDescriptionWrapper>
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
