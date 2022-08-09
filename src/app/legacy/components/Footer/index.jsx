import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, string, node, bool } from 'prop-types';
import { C_EBON, C_WHITE } from '#psammead/psammead-styles/src/colours';
import {
  getSansBold,
  getSansRegular,
} from '#psammead/psammead-styles/src/font-styles';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

import { AmpCookieSettingsButton } from '#containers/ConsentBanner/Banner/cookie.amp';
import Link from './Link';
import List from './List';

const SitewideLinksWrapper = styled.div`
  ${({ script }) => script && getBrevier(script)}
  ${({ service }) => service && getSansRegular(service)}
  background-color: ${C_EBON};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const ConstrainedWrapper = styled.div`
  max-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN};
  margin: 0 auto;
  ${({ trustProjectLink }) =>
    trustProjectLink && `padding-top: ${GEL_SPACING};`}
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  margin: 0;
  padding: ${GEL_SPACING_DBL} 0;
`;

const StyledAmpCookieSettingsButton = styled(AmpCookieSettingsButton)`
  ${({ service }) => service && getSansBold(service)}
  background: none;
  border: none;
  color: ${C_WHITE};
  cursor: pointer;
  display: block;
  padding: ${GEL_SPACING} 0 ${GEL_SPACING};
  text-decoration: none;
  text-align: left;
  width: 100%;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const SitewideLinks = ({
  links,
  trustProjectLink,
  copyrightText,
  externalLink,
  isAmp,
  script,
  service,
}) => {
  const elements = links.map(({ id, text, href, lang }) => {
    if (isAmp && id === 'COOKIE_SETTINGS') {
      return (
        <StyledAmpCookieSettingsButton lang={lang} service={service}>
          {text}
        </StyledAmpCookieSettingsButton>
      );
    }
    return <Link service={service} text={text} href={href} lang={lang} />;
  });

  return (
    <SitewideLinksWrapper script={script} service={service}>
      <ConstrainedWrapper trustProjectLink={trustProjectLink}>
        <List
          service={service}
          elements={elements}
          trustProjectLink={trustProjectLink}
        />
        <StyledParagraph>
          {copyrightText}{' '}
          <Link
            service={service}
            text={externalLink.text}
            href={externalLink.href}
            inline
          />
        </StyledParagraph>
      </ConstrainedWrapper>
    </SitewideLinksWrapper>
  );
};

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

SitewideLinks.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  copyrightText: node.isRequired,
  trustProjectLink: linkPropTypes,
  externalLink: linkPropTypes.isRequired,
  isAmp: bool,
  script: shape({}),
  service: string,
};

SitewideLinks.defaultProps = {
  script: null,
  service: null,
  isAmp: false,
  trustProjectLink: null,
};

export default SitewideLinks;
