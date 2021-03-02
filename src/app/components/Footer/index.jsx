import React from 'react';
import styled from '@emotion/styled';
import { arrayOf, shape, string, node } from 'prop-types';
import { C_EBON, C_WHITE } from '@bbc/psammead-styles/colours';
import { getBrevier } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_MARGIN_BELOW_400PX,
  GEL_MARGIN_ABOVE_400PX,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

import Link from './Link';
import List from './List';

const SitewideLinksWrapper = styled.div`
  ${({ script }) => script && getBrevier(script)}
  ${({ service }) => getSansRegular(service)}
  background-color: ${C_EBON};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_BELOW_400PX};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: 0 ${GEL_MARGIN_ABOVE_400PX};
  }
`;

const ConstrainedWrapper = styled.div`
  max-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN};
  margin: 0 auto;
  ${({ trustProjectLink }) =>
    trustProjectLink && `padding-top: ${GEL_SPACING})`}
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  margin: 0;
  padding: ${GEL_SPACING_DBL} 0;
`;

const SitewideLinks = ({
  links,
  trustProjectLink,
  copyrightText,
  externalLink,
  script,
  service,
}) => (
  <SitewideLinksWrapper script={script} service={service}>
    <ConstrainedWrapper trustProjectLink={trustProjectLink}>
      <List links={links} trustProjectLink={trustProjectLink} />
      <StyledParagraph>
        {copyrightText}{' '}
        <Link text={externalLink.text} href={externalLink.href} inline />
      </StyledParagraph>
    </ConstrainedWrapper>
  </SitewideLinksWrapper>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

SitewideLinks.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  copyrightText: node.isRequired,
  trustProjectLink: linkPropTypes,
  externalLink: linkPropTypes.isRequired,
  script: shape({}).isRequired,
  service: string.isRequired,
};

SitewideLinks.defaultProps = { trustProjectLink: null };

export default SitewideLinks;
