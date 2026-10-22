import { use, useState } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '../../../Text';
import styles from './index.module.scss';
import { LocalStorageContext } from '../../LocalStorageProvider';
import defaultTranslations from '../defaultTranslations';

export type HintData = {
  title: string;
  hintText: string;
  price?: number;
  paidSymbol?: string;
};

export default ({
  title,
  hintText,
  paidSymbol = 'Hint',
  price = 250,
  index,
}: HintData & { index: number }) => {
  const { paidHints, buyHint, coins } = use(LocalStorageContext);
  const { translations } = use(ServiceContext);
  const { riddle = defaultTranslations } = translations;
  const { paid, notEnoughCredits } = riddle;
  const [isInvoked, setIsInvoked] = useState(false);
  const priceText = `🪙 ${price}`;
  const paidStatus = paidHints[index];

  const isAffordable = price <= coins;
  return (
    <details
      className={styles.hintContainer}
      {...((paidStatus || !isAffordable) && {
        disabled: true,
        'aria-hidden': 'true',
      })}
      {...(paidStatus && !isInvoked && { open: true })}
    >
      <summary
        className={styles.hintSummary}
        onClick={event => {
          buyHint(index, price);
          setIsInvoked(true);
          event.currentTarget.blur();
        }}
        {...((paidStatus || !isAffordable) && { tabIndex: -1 })}
      >
        <Text className={styles.hintPrice} size="pica" fontVariant="serifLight">
          {paidStatus ? paidSymbol : priceText}
        </Text>
        <Text
          className={styles.hintSummaryText}
          size="pica"
          fontVariant="sansBold"
        >
          {title.length > 0 ? title : 'Hint'}
        </Text>
        <div className={styles.paidIcon}>
          <Text size="minion" fontVariant="sansBold">
            {paid}
          </Text>
        </div>
        {!paidStatus && !isAffordable && (
          <div className={styles.notEnough}>
            <Text size="minion" fontVariant="sansBold">
              {notEnoughCredits}
            </Text>
          </div>
        )}
      </summary>
      <Text
        className={styles.hintAnswerText}
        size="pica"
        fontVariant="sansBold"
      >
        {hintText}
      </Text>
    </details>
  );
};
