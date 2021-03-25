/* eslint-disable jsx-a11y/aria-role */
import React, { useContext } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
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

import { ServiceContext } from '#contexts/ServiceContext';
import getExternalLinkLang from '#lib/utilities/getExternalLinkLang';
import Link from './Link';

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
  const { translations, service, script, dir, lang } = useContext(
    ServiceContext,
  );

  if (!links.length) return null;

  const defaultTranslation = 'This podcast is also available on';
  const title = pathOr(
    defaultTranslation,
    ['media', 'podcastExternalLinks'],
    translations,
  );
  const hasMultipleLinks = links.length > 1;
  const firstLink = links[0];

  return (
    <Wrapper role="complementary" aria-labelledby="third-party-links">
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
              <Link href={linkUrl} service={service} script={script} dir={dir}>
                <span role="text">
                  <span
                    lang={getExternalLinkLang({
                      podcastService: linkText,
                      serviceLang: lang,
                    })}
                  >
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
          href={firstLink.linkUrl}
          key={firstLink.linkText}
          service={service}
          script={script}
          dir={dir}
        >
          <span>
            <span
              lang={getExternalLinkLang({
                podcastService: firstLink.linkText,
                serviceLang: lang,
              })}
            >
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
