/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Ad from '..';
import { MPUAdProps } from '../types';
import styles from './index.styles';

export default ({ className }: MPUAdProps) => {
  return <Ad css={styles.mpu} slotType="mpu" className={className} />;
};
