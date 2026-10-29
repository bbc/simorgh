import clsx from 'clsx';
import { useState, useEffect, MouseEvent } from 'react';
import { FooterLink } from '#app/models/types/serviceConfig';
import styles from './index.module.scss';

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

  return (
    <a
      className={clsx(
        styles.link,
        isVisible && inline && styles.inline,
        !isVisible && styles.hidden,
        'focusIndicatorInvert',
      )}
      lang={lang}
      href={href}
      onClick={onClick}
    >
      {text}
    </a>
  );
};
