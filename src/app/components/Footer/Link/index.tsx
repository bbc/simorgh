import React, { useState, useEffect, MouseEvent } from 'react';
import { FooterLink } from '#app/models/types/serviceConfig';

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

  let displayClass = inline ? 'inline' : 'block';
  if (!isVisible) {
    displayClass = 'hidden';
  }

  return (
    <a
      className={`
        font-gel-sans-bold
        text-white
        py-3
        no-underline
        hover:underline
        focus:underline
        focusIndicatorInvert
        ${displayClass}
      `}
      lang={lang}
      href={href}
      onClick={onClick}
    >
      {text}
    </a>
  );
};
