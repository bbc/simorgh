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
        css={[
          styles.color,
          {
            '::before': {
              background: `${colorCode}`,
            },
          },
        ]}
      >
        <Text size="bodyCopy" fontVariant="sansRegular" as="strong">
          {colorName}
        </Text>
        <br />
        {colorCode}
      </Text>
    </div>
  );
};

export default ColorCard;
