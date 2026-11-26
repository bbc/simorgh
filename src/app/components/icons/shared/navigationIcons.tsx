import type { SVGProps } from 'react';
import styles from './index.module.scss';

const defaultAttrs = {
  focusable: 'false',
  width: '2.75rem',
  height: '2.75rem',
  viewBox: '0 0 44 44',
} satisfies SVGProps<SVGSVGElement>;

const navigationIcons = {
  hamburger: (
    <svg className={styles.navigation} {...defaultAttrs} aria-hidden="true">
      <path d="M12 29h21v-2.333H12V29zm0-5.833h21v-2.334H12v2.334zM12 15v2.333h21V15H12z" />
    </svg>
  ),
  cross: (
    <svg className={styles.navigation} {...defaultAttrs} aria-hidden="true">
      <path
        d="M26.741 15L21.6 20.142 16.458 15 15 16.458l5.142 5.142L15 26.742l1.458 1.458 5.142-5.141 5.141 5.141 1.459-1.458-5.142-5.142 5.142-5.142z"
        fillRule="evenodd"
      />
    </svg>
  ),
};

export default navigationIcons;
