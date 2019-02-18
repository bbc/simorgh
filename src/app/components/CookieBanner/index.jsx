import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { GEL_GREAT_PRIMER, GEL_PICA } from '@bbc/gel-foundations/typography';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';

const ConsentDialog = styled.div`
  background-color: #323232;
  padding: ${GEL_SPACING_DBL};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    &:after {
      content: \\0020;
      clear: both;
      display: block;
      height: 0;
      overflow: hidden;
      visibility: hidden;
    }
  }
`;

const ConsentTitle = styled.h2`
  ${GEL_GREAT_PRIMER}
  color: ${C_WHITE};
  font-family: ${FF_NEWS_SANS_REG};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    float: left;
    width: 20%;
    margin-right: ${GEL_SPACING_DBL};
  }
`;

const ConsentParagraph = styled.p`
  color: #bebebe;
  font-family: ${FF_NEWS_SANS_REG};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
    width: 50%;
    float: left;
  }
`;

const ConsentOptionsBox = styled.div`
  text-align: center;

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    width: 20%;
    float: right;
  }
`;

const ConsentButton = styled.button`
  ${GEL_PICA}; //'pica-bold';
  font-family: ${FF_NEWS_SANS_REG};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: block;
  }

  @include mq($until: $consent-dialog-mobile-limit) {
    width: 25%;
  }

  background: transparent;
  border: none;
  margin: 0 auto;
  color: #f6a21d;
  padding-bottom: ${GEL_SPACING};
`;

const CookieBanner = ({
  title,
  description,
  accept,
  reject,
  idParent,
  idPrompt,
}) => (
  <ConsentDialog id={idPrompt}>
    <ConsentTitle>{title}</ConsentTitle>
    <ConsentParagraph>{description}</ConsentParagraph>
    <ConsentOptionsBox>
      <ConsentButton on={`tap:${idParent}.accept`} role="button">
        {accept}
      </ConsentButton>
      <ConsentButton on={`tap:${idParent}.reject`} role="button">
        {reject}
      </ConsentButton>
    </ConsentOptionsBox>
  </ConsentDialog>
);

CookieBanner.propTypes = {
  idParent: string,
  idPrompt: string,
  title: string,
  description: string,
  accept: string,
  reject: string,
};

CookieBanner.defaultProps = {
  title: 'Let us know you agree to cookies',
  description:
    'We use cookies to give you the best online experience. Please let us know if you agree to all of these cookies.',
  accept: 'Accept',
  reject: 'Reject',
  idParent: 'consent',
  idPrompt: 'consent-prompt',
};

export default CookieBanner;
