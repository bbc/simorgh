import React from 'react';
import Spinner from '#app/components/Spinner';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import styles from './index.module.scss';

type Props = {
  label?: string;
  testId: string;
  className?: string;
};

const MyNewsSpinner = ({ label, testId, className }: Props) => (
  <div className={className ?? styles.container} data-testid={testId}>
    <VisuallyHiddenText aria-live="polite">{label}</VisuallyHiddenText>
    <Spinner className={styles.spinner} />
  </div>
);

export default MyNewsSpinner;
