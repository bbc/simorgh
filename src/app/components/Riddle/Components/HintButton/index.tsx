import { use } from 'react';
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
  price = 500,
  index,
  onClickFn,
}: HintData & { index: number; onClickFn?: () => void }) => {
  const { paidHints, buyHint, coins } = use(LocalStorageContext);
  const { translations } = use(ServiceContext);

  const { riddle = defaultTranslations } = translations;
  const { paid, notEnoughCredits } = riddle;

  const priceText = `🪙 ${price}`;
  const paidStatus = paidHints[index];

  const isAffordable = price <= coins;

  return (
    <div className={styles.hintContainer}>
      <button
        type="button"
        className={styles.hintButton}
        onClick={() => {
          if (onClickFn) {
            onClickFn();
          }
          buyHint(index, price);
        }}
        {...((paidStatus || !isAffordable) && { disabled: true })}
      >
        {paidStatus && (
          <div className={styles.paidIcon}>
            <Text size="minion" fontVariant="sansBold">
              {paid}
            </Text>
          </div>
        )}
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
        {!paidStatus && !isAffordable && (
          <div className={styles.notEnough}>
            <Text size="minion" fontVariant="sansBold">
              {notEnoughCredits}
            </Text>
          </div>
        )}
        {paidStatus && (
          <Text
            className={styles.hintAnswerText}
            size="pica"
            fontVariant="sansBold"
          >
            {hintText}
          </Text>
        )}
      </button>
    </div>
  );
};
