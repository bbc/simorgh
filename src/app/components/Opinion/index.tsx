/** @jsx jsx */
/** @jsxFrag */
import { jsx } from '@emotion/react';
import Blocks from '#app/legacy/containers/Blocks';
import { OpinionPageProps } from './types';
import styles from './index.styles';
import Heading from '../Heading';
import Title from './Title';
import QuoteList from './QuoteList';
import TouchPad, { useTouchEventContext } from './TouchPad';

const Components = {
  title: Title,
  quoteList: QuoteList,
};

const ShuffleButton = () => {
  const { swipeLeft } = useTouchEventContext();

  return (
    <button
      type="button"
      css={styles.shuffleButton}
      onClick={() => swipeLeft()}
    >
      shuffle
    </button>
  );
};

const OpinionPage = ({ blocks }: OpinionPageProps) => {
  return (
    <TouchPad>
      <Heading
        css={styles.opinionHeading}
        level={1}
        size="greatPrimer"
        fontVariant="sansLight"
      >
        Opinion
      </Heading>
      <div id="opinions_panel">
        <Blocks blocks={blocks} componentsToRender={Components} />;
      </div>
      <ShuffleButton />
      <div>
        <a href="google.com">Prev</a>
        <a href="google.com">Next</a>
      </div>
    </TouchPad>
  );
};

export default OpinionPage;
