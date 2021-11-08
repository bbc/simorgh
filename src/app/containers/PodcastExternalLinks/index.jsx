/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import styled from '@emotion/styled';
import { C_CLOUD_LIGHT, C_SHADOW } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { getGreatPrimer } from '@bbc/gel-foundations/typography';

import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

import { ServiceContext } from '#contexts/ServiceContext';
import Link from './Link';

const EN_GB_LANG = 'en-GB';

const ExternalLinkTextLangs = {
  Spotify: EN_GB_LANG,
  Apple: EN_GB_LANG,
  RSS: EN_GB_LANG,
  Yandex: EN_GB_LANG,
  Castbox: EN_GB_LANG,
};

const Wrapper = styled.aside`
  border-top: 0.0625rem ${C_CLOUD_LIGHT} solid;
  border-bottom: 0.0625rem ${C_CLOUD_LIGHT} solid;
  margin: 0;
  padding: 0;
  margin-bottom: ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
`;

const ThirdPartyLinksTitle = styled.h2`
  ${({ script }) => getGreatPrimer(script)}
  ${({ service }) => getSansRegular(service)}
  color: ${C_SHADOW};
  margin: 0;
  margin-top: 1rem;
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    margin-top: 1rem;
    margin-bottom: 0;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 1rem;
    margin-bottom: 0;
  }
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledListItem = styled.li`
  display: inline-block;

  &:not(:first-of-type) > a > span {
    ${({ dir }) =>
      dir === 'rtl'
        ? `
      padding-right: 1rem;
      border-right: 0.0625rem ${C_CLOUD_LIGHT} solid;`
        : `
      padding-left: 1rem;
      border-left: 0.0625rem ${C_CLOUD_LIGHT} solid;
      `}
  }
`;

const PodcastExternalLinks = ({ brandTitle, links }) => {
  const { translations, service, script, dir, lang } =
    useContext(ServiceContext);
  const { externalLinkText } = useContext(ServiceContext);

  const eventTrackingData = {
    componentName: 'third-party',
    campaignID: 'player-episode-podcast',
  };

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  if (!links.length) return null;

  const defaultTranslation = 'This podcast is also available on';
  const title = translations?.media?.PodcastExternalLinks || defaultTranslation;
  const hasMultipleLinks = links.length > 1;
  const firstLink = links[0];

  return (
    <Wrapper
      role="complementary"
      aria-labelledby="third-party-links"
      ref={viewTrackerRef}
    >
      <ThirdPartyLinksTitle
        script={script}
        service={service}
        id="third-party-links"
      >
        {title}
      </ThirdPartyLinksTitle>
      {hasMultipleLinks ? (
        <StyledList role="list">
          {links.map(({ linkText, linkUrl }) => (
            <StyledListItem dir={dir} key={linkText}>
              <Link
                aria-label={`${linkText}, ${brandTitle}${externalLinkText}`}
                href={linkUrl}
                service={service}
                script={script}
                dir={dir}
                onClick={clickTrackerRef}
              >
                <span role="text">
                  <span lang={ExternalLinkTextLangs[linkText] || lang}>
                    {linkText}
                  </span>
                  <VisuallyHiddenText>{`, ${brandTitle}`}</VisuallyHiddenText>
                </span>
              </Link>
            </StyledListItem>
          ))}
        </StyledList>
      ) : (
        <Link
          aria-label={`${firstLink.linkText}, ${brandTitle} ${externalLinkText}`}
          href={firstLink.linkUrl}
          key={firstLink.linkText}
          service={service}
          script={script}
          dir={dir}
          onClick={clickTrackerRef}
        >
          <span>
            <span lang={ExternalLinkTextLangs[firstLink.linkText] || lang}>
              {firstLink.linkText}
            </span>
            <VisuallyHiddenText>{`, ${brandTitle}`}</VisuallyHiddenText>
          </span>
        </Link>
      )}
    </Wrapper>
  );
};

PodcastExternalLinks.propTypes = {
  brandTitle: string.isRequired,
  links: arrayOf(
    shape({
      linkText: string.isRequired,
      linkUrl: string.isRequired,
    }),
  ).isRequired,
};

export default PodcastExternalLinks;
