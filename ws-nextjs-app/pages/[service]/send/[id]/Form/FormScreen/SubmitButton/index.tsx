/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import styles from './styles';
import fallbackTranslations from '../../../fallbackTranslations';

const Submit = () => {
  const {
    translations: {
      ugc: { submitButton = fallbackTranslations.submitButton } = {},
    },
  } = useContext(ServiceContext);

  return (
    <button css={styles.submit} type="submit">
      {submitButton}
    </button>
  );
};

export default Submit;
