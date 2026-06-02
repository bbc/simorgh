import { Spinner as SpinnerIcon } from '#app/components/icons';
import styles from './index.styles';

interface SpinnerProps {
  className?: string;
  testId?: string;
}

const Spinner = ({ className, testId }: SpinnerProps) => (
  <SpinnerIcon
    css={styles.spinner}
    className={className}
    data-testid={testId}
  />
);

export default Spinner;
