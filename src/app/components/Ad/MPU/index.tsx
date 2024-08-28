/** @jsx jsx */
import { jsx } from '@emotion/react';
import { NegativeMargin } from '#lib/styles.const';
import Ad from '..';
import { SLOT_TYPES } from '../types';
import styles from './index.styles';

export default ({ className }: { className?: string }) => (
  <Ad
    css={[NegativeMargin, styles.mpu]}
    slotType={SLOT_TYPES.MPU}
    className={className}
  />
);
