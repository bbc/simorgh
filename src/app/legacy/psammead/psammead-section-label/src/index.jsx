import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import { GHOST } from '#app/components/ThemeProvider/palette';
import { focusIndicatorThickness } from '#app/components/ThemeProvider/focusIndicator';
import { PlainTitle, LinkTitle } from './titles';

const SectionLabelWrapper = styled.div`
  position: relative;
  z-index: 0;
  color: ${props => props.theme.palette.GREY_10};

  margin-top: ${GEL_SPACING_QUAD};

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    margin-top: ${GEL_SPACING_TRPL};
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-bottom: ${GEL_SPACING_TRPL};
  }

  ${({ visuallyHidden }) =>
    visuallyHidden &&
    `
      clip-path: inset(100%);
      clip: rect(1px, 1px, 1px, 1px);
      height: 1px;
      overflow: hidden;
      position: absolute;
      width: 1px;
    `}
`;

export const Heading = styled.h2`
  /* reset default margins */
  margin: 0;
  padding: 0;
  scroll-margin-top: ${GEL_SPACING_DBL};

  :focus-visible {
    outline: ${({ theme: { palette } }) =>
      `${focusIndicatorThickness} solid ${palette.BLACK}`};
    box-shadow: ${({ theme: { palette } }) =>
      `0 0 0 ${focusIndicatorThickness} ${palette.WHITE}`};
    outline-offset: ${focusIndicatorThickness};
  }
`;

const SectionLabel = ({
  children: title,
  dir = 'ltr',
  href = '',
  labelId,
  linkText = '',
  script,
  service,
  visuallyHidden = false,
  backgroundColor = GHOST,
  overrideHeadingAs = '',
  ...props
}) => (
  <SectionLabelWrapper visuallyHidden={visuallyHidden} {...props}>
    <Heading
      as={overrideHeadingAs}
      {...(labelId &&
        !overrideHeadingAs && {
          id: `section-label-heading-${labelId}`,
          tabIndex: -1,
        })}
    >
      {linkText && href ? (
        <LinkTitle
          dir={dir}
          href={href}
          labelId={labelId}
          linkText={linkText}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </LinkTitle>
      ) : (
        <PlainTitle
          dir={dir}
          labelId={labelId}
          script={script}
          service={service}
          backgroundColor={backgroundColor}
        >
          {title}
        </PlainTitle>
      )}
    </Heading>
  </SectionLabelWrapper>
);

export default SectionLabel;
