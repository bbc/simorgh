/** @jsx jsx */
import { use, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import Text from '../../../Text';
import style from './index.styles';
import LocalStorageProvider, {
  LocalStorageContext,
} from '../../LocalStorageProvider';

const ReadMeter = () => {
  const { coins, addCoins } = use(LocalStorageContext);
  const [message, setMessage] = useState<null | string>(null);
  useEffect(() => {
    const listener = (event: Event) => {
      console.log('CHECK THIS EVENT', event);
      // addCoins(10);
    };

    document.addEventListener('scroll', listener);
    return () => {
      document.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <div css={style.container}>
      <Text css={style.heading} fontVariant="sansBold" size="brevier">
        CREDITS
      </Text>
      <Text css={style.guage} size="greatPrimer" fontVariant="serifLight">
        {message ?? coins}
      </Text>
    </div>
  );
};

export default () => (
  <LocalStorageProvider>
    <ReadMeter />
  </LocalStorageProvider>
);
