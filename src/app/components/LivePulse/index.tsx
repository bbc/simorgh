import { PropsWithChildren } from 'react';
import styles from './index.module.css';
import { PulseProps } from '../LiveLabel/types';

const Pulse = ({ className, width, height, css }: PropsWithChildren<PulseProps>) => {
  const containerClassName = [
    styles.pulseContainer,
    css,
    className,
  ].filter(Boolean).join(' ');

  return (
    <svg
      className={containerClassName}
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 32 32"
      width={width}
      height={height}
    >
      <path d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm0-4C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0z" />
      <circle className={styles.pulseInnerCircle} cx="16" cy="16" r="8.5" />
    </svg>
  );
};

export default Pulse;
