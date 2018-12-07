import React from 'react';
import styled from 'styled-components';
import { arrayOf, shape, string } from 'prop-types';
import { C_ORBIT_GREY, C_WHITE } from '@bbc/psammead-styles/colours';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';
import { T_BREVIER } from '../../lib/constants/typography';
import Link from './Link';
import List from './List';
import { GEL_SPACING_DBL } from '../../lib/constants/styles';
import { layoutWrapperWithoutGrid } from '../../lib/layoutGrid';

const SitewideLinksWrapper = styled.div`
  ${layoutWrapperWithoutGrid};
  background-color: ${C_ORBIT_GREY};
  ${T_BREVIER};
  font-family: ${FF_NEWS_SANS_REG};
`;

const StyledParagraph = styled.p`
  color: ${C_WHITE};
  margin: 0;
  padding: ${GEL_SPACING_DBL} 0;
`;

const SitewideLinks = ({ links, copyrightText, externalLink }) => (
  <SitewideLinksWrapper>
    <List links={links} />
    <StyledParagraph>
      {copyrightText}
      <Link text={externalLink.text} href={externalLink.href} inline />
    </StyledParagraph>
  </SitewideLinksWrapper>
);

const linkPropTypes = shape({
  href: string.isRequired,
  text: string.isRequired,
});

SitewideLinks.propTypes = {
  links: arrayOf(linkPropTypes.isRequired).isRequired,
  copyrightText: string.isRequired,
  externalLink: linkPropTypes.isRequired,
};

export default SitewideLinks;
