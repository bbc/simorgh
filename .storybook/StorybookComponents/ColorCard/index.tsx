import React from 'react';
import styles from './index.styles';

const ColorCard = ({ COLORS }) => {
  return (
    <ul css={styles.colorGrid}>
      {COLORS.map((item, index) => {
        return (
          <li key={index}>
            <div css={[styles.wrapper]}>
              <strong
                css={[
                  styles.color,
                  {
                    '::before': {
                      background: `${item.colorCode}`,
                    },
                  },
                ]}
              >
                {item.colorName}
              </strong>
              <br />
              {item.colorCode}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ColorCard;
