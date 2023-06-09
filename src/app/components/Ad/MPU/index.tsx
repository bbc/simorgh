/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { NegativeMargin } from '#app/lib/styles.const';
import Ad from '..';

export default (className?: string) => {
  return <Ad css={NegativeMargin} slotType="mpu" className={className} />;
};
