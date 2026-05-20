import { useContext } from 'react';

import { Warning } from '#app/components/icons';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { service as newsConfig } from '#lib/config/services/news';
import Text from '../../Text';
import style from './index.styles';

const DEFAULT_NO_JS_MESSAGE = newsConfig.default.translations.media.noJs;

export default () => {
  const {
    translations: {
      media: { noJs = DEFAULT_NO_JS_MESSAGE },
    },
  } = useContext(ServiceContext);

  return (
    <div css={style.container}>
      <Warning css={style.icon} />
      <Text css={style.message} as="p">
        {noJs}
      </Text>
    </div>
  );
};
