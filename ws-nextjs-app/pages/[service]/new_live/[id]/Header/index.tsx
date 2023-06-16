/** @jsx jsx */

import { jsx } from '@emotion/react';
import Heading from '#app/components/Heading';
import Text from '#app/components/Text';
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
      <div css={styles.grid}>
        <div css={styles.labelColumn}>
          {/* Holding styles and text for live label */}
          <Text
            css={styles.placeholderStyles}
            as="p"
            size="trafalgar"
            fontVariant="sansBold"
          >
            PLACEHOLDER
          </Text>
        </div>
        <div css={styles.textColumn}>
          <Heading
            size="trafalgar"
            fontVariant="sansBold"
            level={1}
            css={styles.title}
            id="content"
          >
            {title}
          </Heading>
          {description && (
            <Text as="p" css={styles.description}>
              {description}
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
