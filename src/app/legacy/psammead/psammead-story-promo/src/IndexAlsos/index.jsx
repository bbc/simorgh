/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import VisuallyHiddenText from '../../../../../components/VisuallyHiddenText';

const StyledIndexAlsos = styled.div`
  position: relative;
  z-index: 2;
  padding: ${GEL_SPACING_DBL} 0 0;
`;

const StyledIndexAlso = styled.div`
  border-top: 1px solid ${props => props.theme.palette.LUNAR};
  padding: ${GEL_SPACING} 0;
`;

const StyledIndexAlsosUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

// `display: inline-block` has been used to resolve Focus Indicator bug in Firefox high contrast mode.
const StyledIndexAlsosLink = styled.a`
  ${({ script }) => script && getBrevier(script)};
  ${({ service }) => getSerifMedium(service)}
  color: ${props => props.theme.palette.EBON};
  text-decoration: none;
  display: inline-block;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${props => props.theme.palette.METAL};
  }

  & svg {
    margin: 0;
  } /* Reset Media Indicator SVG margin */
`;

const IndexAlsosLink = ({
  children,
  script,
  service,
  url,
  mediaIndicator = null,
  mediaType = null,
}) => {
  const sanitisedUrl = url.replace(/\W/g, '');

  return (
    <StyledIndexAlsosLink
      href={url}
      script={script}
      service={service}
      className="focusIndicatorDisplayInlineBlock"
      // Line 63 and id={`IndexAlsosLink-${sanitisedUrl}`} in line 68 are temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      {...(mediaIndicator && {
        'aria-labelledby': `IndexAlsosLink-${sanitisedUrl}`,
      })}
    >
      {mediaIndicator ? (
        <>
          {mediaIndicator}
          <span role="text" id={`IndexAlsosLink-${sanitisedUrl}`}>
            <VisuallyHiddenText>{`${mediaType}, `}</VisuallyHiddenText>
            <span>{children}</span>
          </span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </StyledIndexAlsosLink>
  );
};

export const IndexAlsos = props => {
  const { offScreenText = null, children } = props;

  return (
    <StyledIndexAlsos {...props}>
      <VisuallyHiddenText as="h4">{offScreenText}</VisuallyHiddenText>
      {children}
    </StyledIndexAlsos>
  );
};

export const IndexAlsosUl = ({ children }) => (
  <StyledIndexAlsosUl role="list">{children}</StyledIndexAlsosUl>
);

export const IndexAlsosLi = ({ ...props }) => (
  <StyledIndexAlso as="li" role="listitem">
    <IndexAlsosLink {...props} />
  </StyledIndexAlso>
);

export const IndexAlso = ({ ...props }) => (
  <StyledIndexAlso>
    <IndexAlsosLink {...props} />
  </StyledIndexAlso>
);
