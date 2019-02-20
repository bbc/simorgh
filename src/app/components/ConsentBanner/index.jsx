import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GEL_GREAT_PRIMER, GEL_PICA } from '@bbc/gel-foundations/typography';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';

const C_CONSENT_BACKGROUND = '#323232';
const C_CONSENT_ACTION = '#F6A21D';
const C_CONSENT_CONTENT = '#BEBEBE';

const Prompt = styled.div`
  background-color: ${C_CONSENT_BACKGROUND};
  padding: ${GEL_SPACING_DBL};
`;

const StyledHeading = styled.h2`
  ${GEL_GREAT_PRIMER}
  font-family: ${FF_NEWS_SANS_REG};
  color: ${C_WHITE};
`;

const StyledParagraph = styled.p`
  color: ${C_CONSENT_CONTENT};
  font-family: ${FF_NEWS_SANS_REG};
`;

const StyledWrapper = styled.div`
  text-align: center;
`;

const StyledButton = styled.button`
  ${GEL_PICA}
  font-family: ${FF_NEWS_SANS_REG};

  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    width: 25%;
  }

  background: transparent;
  border: none;
  margin: 0 auto;
  color: ${C_CONSENT_ACTION};
  padding-bottom: ${GEL_SPACING};

  &:focus,
  &:hover {
    color: ${C_WHITE};
  }
`;

const ConsentBanner = ({
  title,
  description,
  accept,
  reject,
  acceptButtonProps,
  rejectButtonProps,
  promptId,
}) => (
  <Prompt id={promptId}>
    <StyledHeading>{title}</StyledHeading>
    <StyledParagraph>{description}</StyledParagraph>
    <StyledWrapper>
      <StyledButton {...acceptButtonProps} role="button">
        {accept}
      </StyledButton>
      <StyledButton {...rejectButtonProps} role="button">
        {reject}
      </StyledButton>
    </StyledWrapper>
  </Prompt>
);

ConsentBanner.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  accept: string.isRequired,
  reject: string.isRequired,
  acceptButtonProps: shape({}).isRequired,
  rejectButtonProps: shape({}).isRequired,
  promptId: string.isRequired,
};

export default ConsentBanner;
