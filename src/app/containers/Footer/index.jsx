import React, { useContext } from 'react';
import styled from 'styled-components';
import SitewideLinks from '@bbc/psammead-sitewide-links';
import { GEL_SPACING_QUAD } from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '../../contexts/ServiceContext';
import BrandContainer from '../Brand';

const Footer = styled.footer`
  padding-top: ${GEL_SPACING_QUAD};
`;

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => `\u00A9 ${currentYear()} ${text} `;

const FooterContainer = () => {
  const { footer } = useContext(ServiceContext);

  if (!footer) {
    return null;
  }

  const { externalLink, links, copyrightText } = footer;

  return (
    <Footer role="contentinfo">
      <BrandContainer />
      <SitewideLinks
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
      />
    </Footer>
  );
};

export default FooterContainer;
