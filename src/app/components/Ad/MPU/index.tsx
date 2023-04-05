/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import Ad from '..';
import styles from './index.styles';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (props: any) => {
  return <Ad css={styles.mpu} slotType="mpu" {...props} />;
};
