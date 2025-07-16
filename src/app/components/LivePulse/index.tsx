import React, { PropsWithChildren } from 'react';
import { PulseProps } from '../LiveLabel/types';

const Pulse = ({ className, width, height }: PropsWithChildren<PulseProps>) => {
  return (
    <svg
      className={`
        text-gel-live-light dark:text-gel-live-dark
        inline-block
        align-[-0.125rem]
        relative
        me-2
        ${className || ''}
      `}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 32 32"
      width={width}
      height={height}
    >
      <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z" />
      <circle 
        className="motion-safe:animate-pulse motion-safe:[animation-duration:1.25s] motion-safe:[animation-timing-function:cubic-bezier(0.455,0.03,0.515,0.955)] motion-safe:[animation-delay:0.5s] motion-safe:[animation-iteration-count:3]"
        cx="16" 
        cy="16" 
        r="8.5" 
      />
    </svg>
  );
};

export default Pulse;
