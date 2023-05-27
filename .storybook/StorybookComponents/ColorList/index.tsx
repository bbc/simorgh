import React from 'react';
import styles from './index.styles';
import ColorCard from './ColorCard';
import SkipLinkWrapper from '../../../src/app/legacy/components/SkipLinkWrapper';

const ColorList = ({ COLORS }) => {
  const terms = { '%colour_bar%': 'Colour Bar' };
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
