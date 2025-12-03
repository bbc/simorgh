/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './index.styles';

interface SVGProps {
  className?: string;
}

export const Confirm = ({ className }: SVGProps) => (
  <svg
    data-testid="confirm"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <path d="m32 7.2-2.5-2.4L11 23.3h2L2.4 12.6 0 15.1l12 12.1 20-20z" />
  </svg>
);

export const Close = ({ className }: SVGProps) => (
  <svg
    data-testid="close"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <path d="m30 4.6-2.8-2.8L2 27.4l2.8 2.8L30 4.6zM4.8 1.8 1.9 4.7l25.2 25.5 2.9-2.9L4.8 1.8z" />
  </svg>
);

export const ExternalLink = ({ className }: SVGProps) => (
  <svg
    data-testid="external-link"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <path d="M21.9 16.9v11.5H3.7V10.2h11.1V7.6H1V31h23.6V16.9h-2.7zM18 1v2.6h10.2l-.5-1.1L11 19l1.9 1.9L29.6 4.3l-1.2-.5V14H31V1H18z" />
  </svg>
);

export const Help = ({ className }: SVGProps) => (
  <svg
    data-testid="help"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <path d="M15.8 26.7c-1.7 0-2.6-1-2.6-2.3s.9-2.3 2.6-2.3c1.7 0 2.6 1 2.6 2.3s-.9 2.3-2.6 2.3zm-1.9-6.9v-.3c0-1.8.6-3.1 2.4-4.3 1.8-1.2 2.3-1.7 2.3-2.9 0-1.4-1.2-2.1-3.3-2.1-1.7 0-3.2.4-4.8 1.4V8c1.7-.9 3.6-1.3 5.6-1.3 4.3 0 7 2 7 5.1 0 2.3-1 3.5-3 4.9-1.9 1.3-2.3 1.8-2.3 2.7v.3h-3.9zM16 31c8.5 0 15-6.5 15-15S24.5 1 16 1 1 7.5 1 16s6.5 15 15 15z" />
  </svg>
);

export const Warning = ({ className }: SVGProps) => (
  <svg
    data-testid="warning"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <g>
      <path
        d="M3.1,30.2h25.8c1.6,0,2.3-0.8,2.3-1.9c0-0.8-0.3-1.4-1-2.9L18.6,3.8c-0.8-1.5-1.5-2-2.6-2s-1.8,0.5-2.6,2L1.8,25.4
		c-0.8,1.5-1.1,2.1-1.1,2.9C0.8,29.4,1.5,30.2,3.1,30.2z M16,26.9c-1.6,0-2.4-1-2.4-2.1c0-1.2,0.8-2.1,2.4-2.1s2.4,1,2.4,2.1
		C18.4,25.9,17.6,26.9,16,26.9z M14.3,20.2L13.5,9.6h5l-0.8,10.6H14.3z"
      />
    </g>
  </svg>
);

export const Recommend = ({ className }: SVGProps) => (
  <svg
    data-testid="recommend"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <g>
      <path
        d="M26.3,9.3C24.1,5.9,20.4,3.8,16,3.8C9.1,3.8,3.9,9.1,3.9,16S9.1,28.2,16,28.2c6.9,0,12.1-5.3,12.1-12.2H31
		c0,8.5-6.5,15-15,15C7.5,31,1,24.5,1,16S7.5,1,16,1c5.9,0,10.9,3.1,13.3,7.9L15.8,22.4l-8.1-8.2l2.1-2.3l7.4,7.4l-2.4-0.2L26.6,7.4
		L26.3,9.3z"
      />
    </g>
  </svg>
);

export const Activity = ({ className }: SVGProps) => (
  <svg
    data-testid="activity"
    viewBox="0 0 32 32"
    width="1rem"
    height="1rem"
    focusable="false"
    aria-hidden="true"
    className={className}
    css={styles.icon}
  >
    <g>
      <path
        d="M28.5,20.3c0.5-0.3,0.6-0.7,0.3-1.1l-3-5.3c-0.3-0.5-0.1-0.8,0.3-1.1c0.3-0.2,0.7-0.2,1.3,0c0.9,0.3,1.6,0.3,2.4-0.2
		c1.5-0.8,2-2.7,0.7-4.9c-1.3-2.2-3.1-2.7-4.6-1.9c-0.8,0.5-1.1,1.1-1.4,2c-0.2,0.6-0.3,1-0.6,1.1c-0.4,0.2-0.8,0.2-1.1-0.3
		l-3.1-5.4c-0.3-0.4-0.7-0.5-1.1-0.3l-5,2.9c-0.4,0.3-0.4,0.7-0.2,1c0.2,0.2,0.5,0.5,1.1,0.6c0.9,0.2,1.5,0.6,1.9,1.3
		c0.9,1.5,0.4,3.3-1.8,4.6c-2.2,1.3-4.1,0.8-5-0.7c-0.4-0.8-0.4-1.5-0.1-2.3c0.2-0.6,0.2-1.1,0-1.3c-0.2-0.3-0.5-0.5-1-0.3l-5,2.9
		c-0.5,0.3-0.6,0.7-0.3,1.1l3.1,5.4c0.3,0.5,0.1,0.9-0.3,1.1c-0.3,0.2-0.8,0.2-1.3,0C3.8,19,3.1,19,2.4,19.4c-1.5,0.9-2,2.7-0.7,4.9
		s3.1,2.7,4.6,1.9c0.8-0.4,1.1-1.1,1.3-2c0.1-0.6,0.4-0.9,0.6-1.1c0.4-0.2,0.8-0.2,1.1,0.3l3,5.3c0.3,0.4,0.7,0.5,1.1,0.3l5-2.9
		c0.4-0.3,0.4-0.6,0.2-1c-0.2-0.2-0.5-0.5-1.1-0.6c-0.9-0.2-1.5-0.5-2-1.3c-0.9-1.5-0.3-3.4,1.9-4.7c2.2-1.3,4.1-0.8,4.9,0.7
		c0.4,0.8,0.5,1.5,0.2,2.3c-0.2,0.6-0.2,1.1,0,1.3c0.2,0.4,0.5,0.5,1,0.3L28.5,20.3z"
      />
    </g>
  </svg>
);
