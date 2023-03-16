import React from 'react';
import styled from '@emotion/styled';
import { node, bool, string, oneOf } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';

const StyledSpan = styled.span`
  ${({ service }) => getSansBold(service)}
  color: ${props => props.theme.palette.POSTBOX};
  display: inline-block;
  ${({ dir }) =>
    dir === 'rtl'
      ? `margin-left: ${GEL_SPACING};`
      : `margin-right: ${GEL_SPACING};`}
`;

const LiveLabel = ({
  service,
  dir,
  ariaHidden,
  liveText,
  offScreenText,
  lang,
  children,
  id,
}) => (
  // lines 27, 56,66, 31 concerning with id are a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  // eslint-disable-next-line jsx-a11y/aria-role
  <span role="text" id={id}>
    <StyledSpan
      service={service}
      dir={dir}
      {...(ariaHidden && { 'aria-hidden': 'true' })}
    >
      {`${liveText} `}
    </StyledSpan>
    {offScreenText && (
      <VisuallyHiddenText lang={lang}>
        {`${offScreenText}, `}
      </VisuallyHiddenText>
    )}
    {children}
  </span>
);

LiveLabel.propTypes = {
  service: string.isRequired,
  dir: oneOf(['rtl', 'ltr']),
  ariaHidden: bool,
  liveText: string,
  offScreenText: string,
  lang: string,
  children: node,
  id: string,
};

LiveLabel.defaultProps = {
  dir: 'ltr',
  ariaHidden: false,
  liveText: 'LIVE',
  offScreenText: null,
  lang: 'en-GB',
  children: null,
  id: null,
};

export default LiveLabel;
