import type { PropsWithChildren } from 'react';

import Pulse from '../LivePulse';
import Text from '../LiveText';
import styles from './index.styles';
import type { LiveLabelProps } from './types';

const LiveLabel = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<LiveLabelProps>) => {
  const pulse = [
    styles.liveLabelPulse,
    className === 'first-promo' && styles.firstPromo,
  ];

  return (
    <>
      <Pulse className={className} width="16" height="16" css={pulse} />
      <Text lang={lang} id={id} offScreenText={offScreenText}>
        {children}
      </Text>
    </>
  );
};

export default LiveLabel;
