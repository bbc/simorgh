import React from 'react';
import styles from './index.styles';
import ColorCard from './ColorCard';
import SkipLinkWrapper from '../../../src/app/legacy/components/SkipLinkWrapper';

const ColorList = ({ COLORS, listName }) => {
  const terms = { '%colour_bar%': 'Colour Bar' };
  return (
    <SkipLinkWrapper
      service="news"
      text={listName}
      endTextId={`end-of-${listName}`}
      endTextVisuallyHidden="end of colour list"
      terms={terms}
    >
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
    </SkipLinkWrapper>
  );
};

export default ColorList;
