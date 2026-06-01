import { Spinner as SpinnerIcon } from '#app/components/icons';
import styles from './index.styles';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className }: SpinnerProps) => (
  <SpinnerIcon css={styles.spinner} className={className} />
);

export default Spinner;
