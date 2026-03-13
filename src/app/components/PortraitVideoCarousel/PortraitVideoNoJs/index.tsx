import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Warning } from '#app/components/icons';
import { service as newsConfig } from '#lib/config/services/news';
import style from './index.styles';
import Text from '../../Text';

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
