/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { NegativeMargin } from '../../../lib/styles.const';
import Ad from '..';
import { SLOT_TYPES } from '../types';

export default (className?: string) => {
  return (
    <Ad css={NegativeMargin} slotType={SLOT_TYPES.MPU} className={className} />
  );
};
