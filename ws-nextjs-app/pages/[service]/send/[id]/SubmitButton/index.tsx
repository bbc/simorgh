import { use } from 'react';

import { ServiceContext } from '#app/contexts/ServiceContext';
import fallbackTranslations from '../fallbackTranslations';
import styles from './styles';

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
