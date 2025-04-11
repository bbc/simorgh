/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import fallbackTranslations from '../fallbackTranslations';

const Submit = () => {
  const {
    translations: {
      ugc: { submitButton = fallbackTranslations.submitButton } = {},
    },
  } = use(ServiceContext);

  return (
    <button css={styles.submit} type="submit">
      {submitButton}
    </button>
  );
};

export default Submit;
