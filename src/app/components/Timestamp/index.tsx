import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './index.module.scss';

interface TimestampProps {
  datetime?: string;
  padding?: boolean;
  className?: string;
}

const Timestamp = ({
  children,
  datetime,
  padding = true,
  className,
}: PropsWithChildren<TimestampProps>) => (
  <time
    dateTime={datetime}
    className={clsx(styles.timestamp, padding && styles.padding, className)}
    suppressHydrationWarning
  >
    {children}
  </time>
);

export default Timestamp;
