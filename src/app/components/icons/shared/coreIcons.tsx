import type { SVGProps } from 'react';
import styles from './index.module.scss';

const defaultAttrs = {
  focusable: 'false',
  'aria-hidden': 'true',
} satisfies SVGProps<SVGSVGElement>;

const coreAttrs = {
  viewBox: '0 0 32 32',
  width: '1rem',
  height: '1rem',
};

const CoreIcons = {
  alert: (
    <svg className={styles.icon} {...defaultAttrs} {...coreAttrs}>
      <path d="M16 2L0 30h32zm2 25h-4v-4h4zm-4-6V11h4v10z" />
    </svg>
  ),
  info: (
    <svg className={styles.icon} {...defaultAttrs} {...coreAttrs}>
      <path d="M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm2 25h-4V13h4zm0-14h-4V7h4z" />
    </svg>
  ),
  clock: (
    <svg
      className={`${styles.icon} ${styles.clock}`}
      viewBox="0 0 13 13"
      width="13"
      height="13"
      {...defaultAttrs}
    >
      <path d="M6.5 0A6.5 6.5 0 1013 6.5 6.5 6.5 0 006.5 0zm0 11.5a5 5 0 115-5 5 5 0 01-5 5z" />
      <path d="M7.34 2.9h-1v3.8L9.4 8.57l.41-.56-2.47-1.89V2.9z" />
    </svg>
  ),
};

export default CoreIcons;
