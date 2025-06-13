/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Warning } from '#app/components/icons';
import style from './index.styles';
import Text from '../../Text';

const DEFAULT_TRANSLATION =
  'To view this content you need to enable JavasScript in your browser.';

export default () => {
  const {
    translations: {
      media: { noJs = DEFAULT_TRANSLATION },
    },
  } = useContext(ServiceContext);

  return (
    <noscript css={style.container}>
      <Warning css={style.icon} />
      <Text css={style.message} as="p">
        {noJs}
      </Text>
    </noscript>
  );
};
