/** @jsx jsx */
/** @jsxRuntime classic */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import LiveLabel from '../LiveLabel';
import { LiveLabelProps } from '../LiveLabel/types';
import styles from './index.styles';

const LiveLabelPromo = ({
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
      <LiveLabel.Pulse
        className={className}
        width="16"
        height="16"
        css={pulse}
      />
      <LiveLabel.Text lang={lang} id={id} offScreenText={offScreenText}>
        {children}
      </LiveLabel.Text>
    </>
  );
};

export default LiveLabelPromo;
