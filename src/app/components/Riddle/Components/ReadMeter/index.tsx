import { use, useEffect, useState } from 'react';
import onClient from '#app/lib/utilities/onClient';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '../../../Text';
import styles from './index.module.scss';
import { LocalStorageContext } from '../../LocalStorageProvider';
import defaultTranslations from '../defaultTranslations';

const ReadMeter = ({ wordCount = 0 }: { wordCount?: number }) => {
  const { coins, addCoins } = use(LocalStorageContext);
  const [message, setMessage] = useState<null | string>(null);
  const { translations } = use(ServiceContext);

  const { riddle = defaultTranslations } = translations;
  const { credits, tooFast } = riddle;

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
        setMessage(tooFast);
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
  }, [addCoins, tooFast, wordCount]);

  return (
    <div className={styles.container}>
      <Text className={styles.heading} size="brevier" fontVariant="sansBold">
        {credits}
      </Text>
      <Text className={styles.guage} size="pica" fontVariant="serifLight">
        {message ?? coins}
      </Text>
    </div>
  );
};

export default ({ wordCount }: { wordCount?: number }) => {
  const ReadMeterWithProvider = <ReadMeter wordCount={wordCount} />;

  return onClient() ? ReadMeterWithProvider : null;
};
