/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import styles from './styles/index.styles';
import { QuoteListProps } from './types';
import Text from '../Text';
import { useGestureEventContext } from './GestureEventContext/GestureEventContext';

const QuoteList = ({ quotes }: QuoteListProps) => {
  const { swipeLeftCount } = useGestureEventContext();

  const [index, setIndex] = useState(0);
  const { text, attribution, attributionLocation } = quotes[index];

  return (
    <div css={styles.opinionParagraph}>
      <Text size="bodyCopy">
        <q>{text}</q> -- {attribution}, {attributionLocation}
      </Text>
    </div>
  );
};

export default QuoteList;
