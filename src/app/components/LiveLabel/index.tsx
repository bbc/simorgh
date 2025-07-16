import React, { PropsWithChildren } from 'react';
import { LiveLabelProps } from './types';
import styles from './index.module.css';
import Text from '../LiveText';
import Pulse from '../LivePulse';

const LiveLabel = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<LiveLabelProps>) => {
  const pulseClassName = [
    styles.liveLabelPulse,
    className === 'first-promo' && styles.firstPromo,
  ].filter(Boolean).join(' ');

  return (
    <>
      <Pulse className={className} width="16" height="16" css={pulseClassName} />
      <Text lang={lang} id={id} offScreenText={offScreenText}>
        {children}
      </Text>
    </>
  );
};

export default LiveLabel;
