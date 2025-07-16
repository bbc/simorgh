import { useState, useEffect, MouseEvent } from 'react';
import { FooterLink } from '#app/models/types/serviceConfig';
import styles from './index.module.css';

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

  const getDisplayClass = () => {
    if (!isVisible) return styles.linkHidden;
    return inline ? styles.linkInline : styles.linkBlock;
  };

  const linkClassName = [
    styles.link,
    getDisplayClass(),
    'focusIndicatorInvert',
  ].join(' ');

  return (
    <a
      className={linkClassName}
      lang={lang}
      href={href}
      onClick={onClick}
    >
      {text}
    </a>
  );
};
