/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useEffect } from 'react';
import onClient from '#lib/utilities/onClient';
import styles from './index.styles';
import { FooterLink } from '#app/models/types/serviceConfig';

interface LinkProps extends FooterLink{
  inline?: boolean;
  onClick?: (e: Event) => void;
  onlyShowIfJSenabled?: boolean;
}

export default ({
  text,
  href,
  inline = false,
  lang,
  onClick,
  onlyShowIfJSenabled = false,
}: LinkProps) => {
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
    <a
      css={[styles.link, css({ display: `${display}` })]}
      lang={lang}
      href={href}
      className="focusIndicatorInvert"
      onClick={onClick}
    >
      {text}
    </a>
  );
};
