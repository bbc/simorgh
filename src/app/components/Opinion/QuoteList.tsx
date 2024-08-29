/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import styles from './index.styles';
import { QuoteListProps } from './types';
import Text from '../Text';
import { useTouchEventContext } from './TouchPad';

const QuoteList = ({ quotes }: QuoteListProps) => {
  const { swipeLeftStack } = useTouchEventContext();

  const [index, setIndex] = useState(0);
  const { text, attribution, attributionLocation } = quotes[index];

  swipeLeftStack.push(() => {
    setIndex(prevIndex => {
      const next = prevIndex + 1;
      if (next >= quotes.length) return 0;
      return next;
    });
  });

  return (
    <div css={styles.opinionParagraph}>
      <Text size="bodyCopy">
        <q>{text}</q> -- {attribution}, {attributionLocation}
      </Text>
    </div>
  );
};

export default QuoteList;
