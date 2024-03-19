import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { string, bool, func } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING_HLF_TRPL } from '#psammead/gel-foundations/src/spacings';
import onClient from '#lib/utilities/onClient';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${props => props.theme.palette.WHITE};
  display: ${props => props.displayState};
  padding: ${GEL_SPACING_HLF_TRPL} 0 ${GEL_SPACING_HLF_TRPL};
  text-decoration: none;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const Link = ({
  service,
  text,
  href,
  inline,
  lang,
  onClick,
  onlyShowIfJSenabled,
}) => {
  const [isVisible, setVisible] = useState(onlyShowIfJSenabled !== true);

  useEffect(() => {
    if (onlyShowIfJSenabled && onClient()) {
      setVisible(true);
    }
  }, [onlyShowIfJSenabled]);

  let display = inline ? 'inline' : 'block';
  if (!isVisible) {
    display = 'none';
  }

  return (
    <StyledLink
      service={service}
      lang={lang}
      displayState={display}
      href={href}
      className="focusIndicatorInvert"
      onClick={onClick}
    >
      {text}
    </StyledLink>
  );
};

Link.defaultProps = {
  service: null,
  inline: false,
  lang: null,
  onClick: null,
  onlyShowIfJSenabled: false,
};

Link.propTypes = {
  service: string,
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
  inline: bool,
  onClick: func,
  onlyShowIfJSenabled: bool,
};

export default Link;
