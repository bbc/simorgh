import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { string, bool, func } from 'prop-types';
import { getSansBold } from '#psammead/psammead-styles/src/font-styles';
import { GEL_SPACING_HLF_TRPL } from '#psammead/gel-foundations/src/spacings';

const StyledLink = styled.a`
  ${({ service }) => service && getSansBold(service)}
  color: ${props => props.theme.palette.WHITE};
  display: ${props => props.display};
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
  visible,
}) => {
  const [isVisible, setVisible] = useState(onlyShowIfJSenabled !== true);
  const [clientside, setClientside] = useState(false);

  useEffect(() => {
    if (onlyShowIfJSenabled) {
      if (clientside) {
        setVisible(visible);
      } else {
        setClientside(true);
      }
    }
  }, [onlyShowIfJSenabled, clientside, visible]);

  let display = inline ? 'inline' : 'block';
  if (!isVisible) {
    display = 'none';
  }

  return (
    <StyledLink
      service={service}
      lang={lang}
      display={display}
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
  visible: true,
};

Link.propTypes = {
  service: string,
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
  inline: bool,
  onClick: func,
  onlyShowIfJSenabled: bool,
  visible: bool,
};

export default Link;
