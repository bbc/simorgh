import React from 'react';
import styles from './index.styles';
import Text from '../../../../src/app/components/Text';

const ColorCard = ({ colorName, colorCode }) => {
  return (
    <div css={[styles.wrapper]}>
      <Text
        size="bodyCopy"
        fontVariant="sansRegular"
        css={[styles.color(colorCode)]}
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        <Text
          size="bodyCopy"
          fontVariant="sansRegular"
          as="strong"
          css={[styles.text]}
        >
          {colorName.toLowerCase()}
        </Text>
        <Text size="bodyCopy" fontVariant="sansRegular" css={[styles.text]}>
          {colorCode}
        </Text>
      </Text>
    </div>
  );
};

export default ColorCard;
