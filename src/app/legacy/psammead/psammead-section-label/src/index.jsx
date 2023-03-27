import React from 'react';
import styled from '@emotion/styled';
import { bool, oneOf, shape, string } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';
import { GHOST } from '#app/components/ThemeProvider/palette';
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

SectionLabelWrapper.propTypes = {
  visuallyHidden: bool.isRequired,
};

export const Heading = styled.h2`
  /* reset default margins */
  margin: 0;
  padding: 0;
`;

const SectionLabel = ({
  children: title,
  dir,
  href,
  labelId,
  linkText,
  script,
  service,
  visuallyHidden,
  backgroundColor,
  overrideHeadingAs,
  ...props
}) => (
  <SectionLabelWrapper visuallyHidden={visuallyHidden} {...props}>
    <Heading as={overrideHeadingAs}>
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

SectionLabel.defaultProps = {
  dir: 'ltr',
  href: null,
  linkText: null,
  visuallyHidden: false,
  backgroundColor: GHOST,
  overrideHeadingAs: null,
};

SectionLabel.propTypes = {
  children: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  href: string,
  labelId: string.isRequired,
  linkText: string,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  visuallyHidden: bool,
  backgroundColor: string,
  overrideHeadingAs: oneOf([null, 'strong']),
};

export default SectionLabel;
