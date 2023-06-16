/** @jsx jsx */

import React from 'react';
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
    <div css={styles.grid}>
      <div css={styles.labelColumn}>Live Label</div>
      <div css={styles.textColumn}>
        <Heading level={1} css={styles.white}>
          {title}
        </Heading>
        <Text as="p" css={styles.white}>
          {description}
        </Text>
      </div>
    </div>
  );
};

export default Header;
