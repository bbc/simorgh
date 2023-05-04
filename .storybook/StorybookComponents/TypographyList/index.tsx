import React from 'react';
import Text from '../../../src/app/components/Text';
import styles from './index.styles';

const TypographyList = ({ TEXT }) => {
  const text: Array<string> = [
    'atlas',
    'elephant',
    'imperial',
    'royal',
    'foolscap',
    'canon',
    'trafalgar',
    'paragon',
    'doublePica',
    'greatPrimer',
    'bodyCopy',
    'pica',
    'longPrimer',
    'brevier',
    'minion',
  ];

  return text.map((item, index) => {
    return (
      <li css={styles.wrapper}>
        <Text size="pica">{`${item}, is mainly used for`} </Text>
        <Text css={styles.textExample} size={item}>Sample text</Text>
      </li>
    );
  });
};

export default TypographyList;
