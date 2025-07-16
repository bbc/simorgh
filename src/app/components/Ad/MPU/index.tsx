import { NegativeMargin } from '../../../lib/styles.const';
import Ad from '..';
import { SLOT_TYPES } from '../types';
import styles from './index.module.css';

export default ({ className }: { className?: string }) => (
  <Ad
    className={[styles.mpu].filter(Boolean).join(' ')}
    slotType={SLOT_TYPES.MPU}
    className={className}
  />
);
