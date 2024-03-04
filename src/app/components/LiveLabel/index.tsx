/** @jsx jsx */
/** @jsxRuntime classic */
/* @jsxFrag React.Fragment */
import React, { PropsWithChildren } from 'react';
import { jsx } from '@emotion/react';
import { LiveLabelProps } from './types';
import styles from './index.styles';
import Text from './Text';
import Pulse from './Pulse';
import Title from './Title';
import Container from './Container';

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
  const populatedChildren = Boolean(children);

  return (
    <>
      <Pulse className={className} width="16" height="16" css={pulse} />
      <Text
        lang={lang}
        id={id}
        offScreenText={offScreenText}
        populatedChildren={populatedChildren}
      />
      <Title>{children}</Title>
    </>
  );
};

LiveLabel.Text = Text;
LiveLabel.Pulse = Pulse;
LiveLabel.Title = Title;
LiveLabel.Container = Container;

export default LiveLabel;
