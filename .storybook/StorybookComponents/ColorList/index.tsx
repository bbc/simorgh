import React from 'react';
import styles from './index.styles';
import ColorCard from './ColorCard';
import isEmpty from 'ramda/src/isEmpty';

interface Props {
  Colors: {
    colorName: string;
    colorCode: string;
  }[];
}

const ColorList = ({ Colors }: Props) => {
  if (!Colors || isEmpty(Colors)) {
    return null;
  }

  const isSingleColor: Boolean = Colors.length === 1;

  return isSingleColor ? (
    <ColorCard
      colorName={Colors[0].colorName}
      colorCode={Colors[0].colorCode}
    ></ColorCard>
  ) : (
    <ul css={styles.colorGrid} role="list">
      {Colors.map((item, index) => {
        return (
          <li key={index}>
            <ColorCard
              colorName={item.colorName}
              colorCode={item.colorCode}
            ></ColorCard>
          </li>
        );
      })}
    </ul>
  );
};

export default ColorList;
