/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import styled from '@emotion/styled';
import { node, string, shape } from 'prop-types';
import { scriptPropType } from '#psammead/gel-foundations/src/prop-types';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  C_EBON,
  C_METAL,
  C_LUNAR,
  C_BLACK,
  C_WHITE,
} from '#psammead/psammead-styles/src/colours';
import { getBrevier } from '#psammead/gel-foundations/src/typography';
import { getSerifMedium } from '#psammead/psammead-styles/src/font-styles';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';

// Focus visible indicator to show around all focusable elements, links, buttons etc, across the WS sites.
const focusIndicatorThickness = '0.1875rem';

const StyledIndexAlsos = styled.div`
  position: relative;
  z-index: 2;
  padding: ${GEL_SPACING_DBL} 0 0;
`;

const StyledIndexAlso = styled.div`
  border-top: 1px solid ${C_LUNAR};
  padding: ${GEL_SPACING} 0;
`;

const StyledIndexAlsosUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const StyledIndexAlsosLink = styled.a`
  ${({ script }) => script && getBrevier(script)};
  ${({ service }) => getSerifMedium(service)}
  color: ${C_EBON};
  text-decoration: none;

  // remove focus
  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }

  & svg {
    margin: 0;
  } /* Reset Media Indicator SVG margin */

  // SOLUTION 2 - using focus:not(:focus-visible)
  // Applies all rules to focus state
  &:focus {
    display: inline-block;
    width: 100%;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  //
  // Overrides these rules depending whether focus-visible state is being used, applies different styles to focus and focus-visible
  &:focus:not(:focus-visible) {
    // add display: none;?
    outline: none;
    box-shadow: none;
    outline-offset: 0;
  }
  //
  &:focus-visible {
    display: inline-block;
    width: 100%;
    outline: ${focusIndicatorThickness} solid ${C_BLACK};
    box-shadow: 0 0 0 ${focusIndicatorThickness} ${C_WHITE};
    outline-offset: ${focusIndicatorThickness};
  }
  // END SOLUTION 2
`;

const IndexAlsosLink = ({
  children,
  script,
  service,
  url,
  mediaIndicator,
  mediaType,
}) => {
  const sanitisedUrl = url.replace(/\W/g, '');

  return (
    <StyledIndexAlsosLink
      href={url}
      script={script}
      service={service}
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

IndexAlsosLink.propTypes = {
  children: node.isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  url: string.isRequired,
  mediaIndicator: node,
  mediaType: string,
};

IndexAlsosLink.defaultProps = {
  mediaIndicator: null,
  mediaType: null,
};

export const IndexAlsos = props => {
  const { offScreenText, children } = props;

  return (
    <StyledIndexAlsos {...props}>
      <VisuallyHiddenText as="h4">{offScreenText}</VisuallyHiddenText>
      {children}
    </StyledIndexAlsos>
  );
};

IndexAlsos.propTypes = {
  children: node.isRequired,
  offScreenText: string,
};

IndexAlsos.defaultProps = {
  offScreenText: null,
};

export const IndexAlsosUl = ({ children }) => (
  <StyledIndexAlsosUl role="list">{children}</StyledIndexAlsosUl>
);

IndexAlsosUl.propTypes = {
  children: node.isRequired,
};

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
