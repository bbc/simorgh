import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GEL_GREAT_PRIMER, GEL_PICA } from '@bbc/gel-foundations/typography';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { FF_NEWS_SANS_REG } from '@bbc/psammead-styles/fonts';

const mainBackgroundColor = '#323232';
const buttonColor = '#f6a21d';
const paragraphColor = '#bebebe';

const Prompt = styled.div`
  background-color: ${mainBackgroundColor};
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

const StyledHeading = styled.h2`
  ${GEL_GREAT_PRIMER}
  font-family: ${FF_NEWS_SANS_REG};
  color: ${C_WHITE};
`;

const StyledParagraph = styled.p`
  color: ${paragraphColor};
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
  color: ${buttonColor};
  padding-bottom: ${GEL_SPACING};
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
