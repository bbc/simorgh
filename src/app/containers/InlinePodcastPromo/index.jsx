import React, { useContext } from 'react';
import styled from '@emotion/styled';
import path from 'ramda/src/path';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { C_LUNAR } from '@bbc/psammead-styles/colours';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import PromoComponent from '../PodcastPromo/components';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

const getSrcFromSize = (url, size) => {
  const src = url.replace('$recipe', `${size}x${size}`);
  return `${src} ${size}w`;
};

const ResponsivePodcastPromoWrapper = styled.div`
  ${({ dir }) => (dir === 'ltr' ? 'float: right;' : 'float: left;')}
  background: ${C_LUNAR};
  height: auto;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    width: 7.06rem;
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_HLF};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    width: 7.62rem;
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    width: 9.25rem;
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    width: 10.93rem;
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 10.93rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 17.25rem;
    margin: ${GEL_SPACING_TRPL} ${GEL_SPACING_DBL};
  }
`;

const StyledPromoComponent = styled(PromoComponent)`
  padding: ${GEL_SPACING_DBL} ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
`;

const StyledImageWrapper = styled(PromoComponent.Card.ImageWrapper)`
  display: inline-block;
  margin: ${GEL_SPACING};

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: none;
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    display: inline-block;
    width: 5.12rem;
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    display: inline-block;
    width: 5.62rem;
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    display: inline-block;
    width: 7.25rem;
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    display: inline-block;
    width: 8.93rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: inline-block;
    margin: ${GEL_SPACING};
    width: 15.18rem;
  }
`;

const StyledCardContentWrapper = styled(PromoComponent.Card.Content)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    padding: ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_SPACING} ${GEL_SPACING} ${GEL_SPACING};
  }
`;

const StyledCardDescriptionWrapper = styled(PromoComponent.Card.Description)`
  margin: ${GEL_SPACING} 0;
  overflow-wrap: break-word;
`;

const StyledEpisodeTextWrapper = styled(PromoComponent.Card.EpisodesText)`
  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    margin: 0;
  }

  @media (min-width: calc(${GEL_GROUP_1_SCREEN_WIDTH_MIN} + 1.25rem)) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}rem) {
    margin: 0 ${GEL_SPACING_HLF};
  }

  @media (min-width: calc(${GEL_GROUP_B_MIN_WIDTH}rem + 2.5rem)) {
    margin: 0;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin: 0 ${GEL_SPACING_HLF};
  }
`;

const StyledCardLink = styled(PromoComponent.Card.Link)`
  ${({ script }) => getPica(script)}
  ${({ service }) => getSerifMedium(service)}
  display: block;
`;

const getSrcSet = (url, sizes) =>
  sizes.map(size => getSrcFromSize(url, size)).join(',');

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);
  const podcastPromoTitle = path(['title'], podcastPromo);
  const podcastBrandTitle = path(['brandTitle'], podcastPromo);
  const description = path(['brandDescription'], podcastPromo);
  const img = path(['image', 'src'], podcastPromo);
  const alt = path(['image', 'alt'], podcastPromo);
  const url = path(['linkLabel', 'href'], podcastPromo);
  const label = path(['linkLabel', 'text'], podcastPromo);

  const eventTrackingData = {
    componentName: 'promo-podcast',
  };

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  const showPromo = [
    podcastBrandTitle,
    podcastPromoTitle,
    description,
    img,
    alt,
    url,
    label,
  ].every(Boolean);

  if (!showPromo) {
    return null;
  }

  const { text, endTextVisuallyHidden } = path(['skipLink'], podcastPromo);

  const terms = {
    '%title%': podcastPromoTitle,
  };

  const skipLink = {
    endTextId: `end-of-podcasts`,
    terms,
    text,
    endTextVisuallyHidden,
  };

  const imgSrc = img.replace('$recipe', '512x512');
  const srcset = getSrcSet(img, [128, 240, 480]);
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return (
    <ResponsivePodcastPromoWrapper ref={viewTrackerRef} dir={dir}>
      <StyledPromoComponent
        script={script}
        service={service}
        role="region"
        aria-labelledby="podcast-promo"
      >
        <SkipLinkWrapper service={service} {...skipLink}>
          <PromoComponent.Title id="podcast-promo" dir={dir} as="strong">
            {podcastPromoTitle}
          </PromoComponent.Title>
          <PromoComponent.Card inlinePromo>
            <StyledImageWrapper>
              <ImageWithPlaceholder
                src={imgSrc}
                srcset={srcset}
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
              <StyledEpisodeTextWrapper dir={dir}>
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
