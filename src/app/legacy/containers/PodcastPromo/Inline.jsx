import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pathOr from 'ramda/src/pathOr';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  getPica,
  getBrevier,
  getLongPrimer,
} from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import { C_LUNAR } from '#psammead/psammead-styles/src/colours';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import { ServiceContext } from '../../../contexts/ServiceContext';
import PromoComponent from './components';
import getPromo from './shared';

const GEL_GROUP_1_WIDTH_260PX = '16.25rem';
const GEL_GROUP_1_WIDTH_320PX = '20rem';
const GEL_GROUP_1_WIDTH_360PX = '22.5rem';

const ResponsivePodcastPromoWrapper = styled.div`
  ${({ dir }) => (dir === 'ltr' ? 'float: right;' : 'float: left;')}
  background: ${C_LUNAR};
  margin: ${GEL_SPACING_TRPL} 0;
  height: auto;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 45%;
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_WIDTH_260PX}) {
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_DBL};
  }
`;

const StyledPromoComponent = styled(PromoComponent)`
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
`;

const StyledImageWrapper = styled(PromoComponent.Card.ImageWrapper)`
  display: inline-block;
  width: 100%;
  margin: 0;
  padding: ${GEL_SPACING};

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: none;
  }
`;

const StyledCardContentWrapper = styled(PromoComponent.Card.Content)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
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

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ script }) => getPica(script)}
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
          <PromoComponent.Title id="podcast-promo" dir={dir} as="strong">
            {podcastPromoTitle}
          </PromoComponent.Title>
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
