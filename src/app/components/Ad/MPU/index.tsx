/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Ad from '..';
import { AdProps } from '../types';
import styles from './index.styles';

export default ({ className }: AdProps) => {
  return <Ad css={styles.mpu} slotType="mpu" className={className} />;
};
