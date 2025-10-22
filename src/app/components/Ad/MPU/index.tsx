import { NegativeMargin } from '../../../lib/styles.const';
import Ad from '..';
import { SLOT_TYPES } from '../types';
import styles from './index.styles';

export default ({
  className,
  nonce,
}: {
  className?: string;
  nonce?: string;
}) => (
  <Ad
    nonce={nonce}
    css={[NegativeMargin, styles.mpu]}
    slotType={SLOT_TYPES.MPU}
    className={className}
  />
);
