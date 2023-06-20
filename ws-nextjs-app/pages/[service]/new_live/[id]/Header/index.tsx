/** @jsx jsx */

import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './styles';

const Header = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div css={styles.backgroundColor}>
      <div css={styles.outerGrid}>
        <Heading
          size="trafalgar"
          level={1}
          css={styles.heading}
          id="content"
          tabIndex={-1}
        >
          {/* role="text" is required to correct a text splitting bug on iOS VoiceOver. */}
          {/* eslint-disable-next-line jsx-a11y/aria-role */}
          <span role="text" css={styles.innerGrid}>
            {/* Holding styles and text for live label */}
            <span css={styles.label}>PLACEHOLDER</span>
            <VisuallyHiddenText>, </VisuallyHiddenText>
            <span css={styles.title}>{title}</span>
          </span>
        </Heading>
        {description && (
          <Text as="p" css={styles.description}>
            {description}
          </Text>
        )}
      </div>
    </div>
  );
};

export default Header;
