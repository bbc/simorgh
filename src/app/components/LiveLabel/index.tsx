import React, { PropsWithChildren } from 'react';
import LiveLabelContext from './LiveLabelContext';
import Text from './Text';
import Pulse from './Pulse';
import { LiveLabelProps } from './types';

const LiveLabel = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<LiveLabelProps>) => {
  return (
    <LiveLabelContext.Provider value={{ lang, id, offScreenText, className }}>
      {children}
    </LiveLabelContext.Provider>
  );
};

LiveLabel.Text = Text;
LiveLabel.Pulse = Pulse;

export default LiveLabel;
