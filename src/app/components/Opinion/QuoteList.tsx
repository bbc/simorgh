/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import styles from './styles/index.styles';
import { QuoteListProps } from './types';
import Text from '../Text';
import { useTouchEventContext } from './TouchPad/TouchPadContext';

const QuoteList = ({ quotes }: QuoteListProps) => {
  const { swipeLeftCount } = useTouchEventContext();

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
