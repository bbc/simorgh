import React from 'react';
import isEmpty from 'ramda/src/isEmpty';
import styles from './index.styles';
import ColorCard from './ColorCard';

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

  const isSingleColor: boolean = Colors.length === 1;

  return isSingleColor ? (
    <ColorCard
      colorName={Colors[0].colorName}
      colorCode={Colors[0].colorCode}
    />
  ) : (
    <ul css={styles.colorGrid} role="list">
      {Colors.map(item => {
        return (
          <li key={item.colorName}>
            <ColorCard colorName={item.colorName} colorCode={item.colorCode} />
          </li>
        );
      })}
    </ul>
  );
};

export default ColorList;
