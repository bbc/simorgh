/** @jsx jsx */
/** @jsxFrag */
import { jsx } from '@emotion/react';
import { OpinionPageProps, QuoteProps } from './types';
import styles from './styles/index.styles';
import Heading from '../Heading';
import Title from './Title';
import Text from '../Text';

const Quote = ({ text, attribution }: QuoteProps) => {
  return (
    <div css={styles.opinionParagraph}>
      <Text size="bodyCopy">
        <q>{text}</q> -- {attribution}
      </Text>
    </div>
  );
};

const OpinionPage = ({ blocks }: OpinionPageProps) => {
  return (
    <div>
      <Heading
        css={styles.opinionHeading}
        level={1}
        size="greatPrimer"
        fontVariant="sansLight"
      >
        Opinion
      </Heading>
      <div id="opinions_panel">
        <Title
          text="Australian schools ban clapping in assemblies."
          link="https://www.bbc.co.uk/news/world-australia-36842731"
        />
        <Quote
          text="This is honestly too ridiculous. I send my children to school to learn, not to wiggle about on the spot."
          attribution="Parent"
          attributionLocation="london"
        />
        <Quote
          text="I have sensitive ears and bans like this would've made school a lot easier for me growing up."
          attribution="Student"
          attributionLocation="london"
        />
      </div>
      <button type="button" css={styles.shuffleButton}>
        shuffle
      </button>
      <div>
        <a href="google.com">Prev</a>
        <a href="google.com">Next</a>
      </div>
    </div>
  );
};

export default OpinionPage;
