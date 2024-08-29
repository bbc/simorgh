/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useRef } from 'react';
import { TitleProps } from './types';
import styles from './index.styles';
import { useTouchEventContext } from './TouchPad';

const Title = ({ text, canonicalUrl }: TitleProps) => {
  const { swipeRightStack } = useTouchEventContext();
  const anchorRef = useRef<HTMLAnchorElement>(null);

  swipeRightStack.push(() => {
    const anchorElement = anchorRef.current;
    (anchorElement as HTMLAnchorElement).click();
  });

  return (
    <a href={canonicalUrl} css={styles.articleLink} ref={anchorRef}>
      <div />
      <span css={styles.title}>{text}</span>
    </a>
  );
};

export default Title;
