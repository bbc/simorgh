/** @jsx jsx */
import { jsx } from '@emotion/react';
import { TitleProps } from './types';
import useOnHovering from './utils/useHovering';
import styles from './styles/index.styles';
import doubleEdgeAnimation from './styles/doubleEdge.animations';

const Title = ({ text, link }: TitleProps) => {
  const { hovering, listeners } = useOnHovering();
  return (
    <a href={link} css={styles.articleLink} {...listeners}>
      <div css={doubleEdgeAnimation(hovering)} />
      <span css={styles.title}>{text}</span>
    </a>
  );
};

export default Title;
