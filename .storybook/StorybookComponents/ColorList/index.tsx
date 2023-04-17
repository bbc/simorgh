import React from 'react';
import styles from './index.styles';
import ColorCard from './ColorCard';

const ColorList = ({ COLORS }) => {
  return (
    <ul css={styles.colorGrid} role="list">
      {COLORS.map((item, index) => {
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
