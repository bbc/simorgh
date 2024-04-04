/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from './types';
import styles from './index.styles';
import Text from './Text';
import Pulse from './Pulse';

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

LiveLabel.Text = Text;
LiveLabel.Pulse = Pulse;

export default LiveLabel;
