import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_B_MIN_WIDTH,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { RequestContext } from '#contexts/RequestContext';
import Footer from '#components/Footer';
import { ServiceContext } from '../../../contexts/ServiceContext';
import BrandContainer from '../Brand';

const currentYear = () => new Date().getFullYear();
const getCopyrightText = text => (
  <>
    <span lang="en-GB">{`\u00A9`} </span>
    {`${currentYear()} ${text}`}
  </>
);

const StyledFooter = styled.footer`
  content-visibility: auto;
  contain-intrinsic-size: 33.125rem;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    contain-intrinsic-size: 26.563rem;
  }
  @media (min-width: ${GEL_GROUP_B_MIN_WIDTH}) {
    contain-intrinsic-size: 23.438rem;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    contain-intrinsic-size: 21.875rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    contain-intrinsic-size: 17.188rem;
  }
`;

const FooterContainer = () => {
  const { isAmp } = useContext(RequestContext);
  const { footer, script, service, serviceLang } = useContext(ServiceContext);

  if (!footer) return null;

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  // linkId="footer" is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652

  return (
    <StyledFooter role="contentinfo" lang={serviceLang}>
      <BrandContainer linkId="footer" borderTop />
      <Footer
        isAmp={isAmp}
        links={links}
        copyrightText={getCopyrightText(copyrightText)}
        externalLink={externalLink}
        script={script}
        service={service}
        trustProjectLink={trustProjectLink}
      />
    </StyledFooter>
  );
};

export default FooterContainer;
