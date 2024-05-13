/** @jsx jsx */
import { jsx } from '@emotion/react';
import styles from './styles';

const Submit = () => {
  const translation = 'Submit';
  return (
    <button css={styles.submit} type="submit">
      {translation}
    </button>
  );
};

export default Submit;
