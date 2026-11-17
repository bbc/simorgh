import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Warning } from '#app/components/icons';
import { service as newsConfig } from '#lib/config/services/news';
import styles from './index.module.scss';
import Text from '../../Text';

const DEFAULT_NO_JS_MESSAGE = newsConfig.default.translations.media.noJs;

export default () => {
  const {
    translations: {
      media: { noJs = DEFAULT_NO_JS_MESSAGE },
    },
  } = useContext(ServiceContext);

  return (
    <div className={styles.container}>
      <Warning className={styles.icon} />
      <Text className={styles.message} as="p">
        {noJs}
      </Text>
    </div>
  );
};
