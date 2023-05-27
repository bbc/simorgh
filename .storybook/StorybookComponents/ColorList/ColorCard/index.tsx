import React from 'react';
import styles from './index.styles';
import Text from '../../../../src/app/components/Text';

const ColorCard = ({ colorName, colorCode }) => {
  return (
    <div css={[styles.wrapper]}>
      <Text
        size="bodyCopy"
        fontVariant="sansRegular"
        role="text"
        css={[styles.color(colorCode)]}
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
