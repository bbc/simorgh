import React, { PropsWithChildren } from 'react';
import { LiveLabelProps } from './types';
import Text from '../LiveText';
import Pulse from '../LivePulse';

const LiveLabel = ({
  lang = 'en-GB',
  id,
  children,
  offScreenText,
  className,
}: PropsWithChildren<LiveLabelProps>) => {
  const pulseClassName = `
    w-[0.9375rem] 
    h-[0.9375rem] 
    group-2:w-8 
    group-2:h-8
    ${className === 'first-promo' ? 
      'w-[1.25rem] h-[1.25rem] group-2:w-[1.375rem] group-2:h-[1.375rem] group-3:w-[1.75rem] group-3:h-[1.75rem]' : 
      ''
    }
  `;

  return (
    <>
      <Pulse className={`${pulseClassName} ${className || ''}`} width="16" height="16" />
      <Text lang={lang} id={id} offScreenText={offScreenText}>
        {children}
      </Text>
    </>
  );
};

export default LiveLabel;
