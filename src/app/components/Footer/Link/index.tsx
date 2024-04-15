/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { useState, useEffect, MouseEvent } from 'react';
import { FooterLink } from '#app/models/types/serviceConfig';
import styles from './index.styles';

interface LinkProps extends FooterLink {
  inline?: boolean;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
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
    if (onlyShowIfJSenabled) {
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
