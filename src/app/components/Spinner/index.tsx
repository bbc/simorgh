import clsx from 'clsx';
import { Spinner as SpinnerIcon } from '#app/components/icons';
import styles from './index.module.scss';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => (
  <SpinnerIcon className={clsx(styles.spinner, className)} />
);

export default Spinner;
