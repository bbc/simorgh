import React from 'react';
import Ad from '..';
import { SLOT_TYPES } from '../types';

export default ({ className }: { className?: string }) => (
  <Ad
    className={`-mx-full ${className || ''}`}
    slotType={SLOT_TYPES.MPU}
  />
);
