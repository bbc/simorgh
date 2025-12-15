/** @jsx jsx */
import { use, useEffect, useState } from 'react';
import { jsx } from '@emotion/react';
import onClient from '#app/lib/utilities/onClient';
import Text from '../../../Text';
import style from './index.styles';
import LocalStorageProvider, {
  LocalStorageContext,
} from '../../LocalStorageProvider';

const ReadMeter = ({ wordCount }: { wordCount: number }) => {
  const { coins, addCoins } = use(LocalStorageContext);
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    let prevTime = new Date().getTime();
    let prevScrollDepth = window.scrollY;

    const RATE_OF_SCROLL_THRESHOLD = 300;
    const listener = () => {
      const documentHeight = document.body.scrollHeight;
      const currTime = new Date().getTime();
      const currScrollDepth = window.scrollY;
      const scrollDelta = currScrollDepth - prevScrollDepth;
      const rateOfScroll = (scrollDelta / (currTime - prevTime)) * 1000;

      const wordsPerLine = wordCount / documentHeight;
      const wordsReadInScroll = Math.ceil(scrollDelta * wordsPerLine);

      if (rateOfScroll > 0 && rateOfScroll <= RATE_OF_SCROLL_THRESHOLD) {
        addCoins(wordsReadInScroll);
      } else if (rateOfScroll > 0) {
        setMessage('TOO FAST!');
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      }

      prevTime = currTime;
      prevScrollDepth = currScrollDepth;
    };

    document.addEventListener('scrollend', listener);
    return () => {
      document.removeEventListener('scrollend', listener);
    };
  }, [addCoins, wordCount]);

  return (
    <div css={style.container}>
      <Text css={style.heading} size="brevier" fontVariant="sansBold">
        CREDITS
      </Text>
      <Text css={style.guage} size="pica" fontVariant="serifLight">
        {message ?? coins}
      </Text>
    </div>
  );
};

export default ({ wordCount }: { wordCount: number }) => {
  const ReadMeterWithProvider = (
    <LocalStorageProvider>
      <ReadMeter wordCount={wordCount} />
    </LocalStorageProvider>
  );

  return onClient() ? ReadMeterWithProvider : null;
};
