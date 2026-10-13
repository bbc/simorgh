import { use } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '../../../Text';
import style from './index.styles';
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
    <div css={style.hintContainer}>
      <button
        type="button"
        css={style.hintButton}
        onClick={() => {
          if (onClickFn) {
            onClickFn();
          }
          buyHint(index, price);
        }}
        {...((paidStatus || !isAffordable) && { disabled: true })}
      >
        {paidStatus && (
          <div css={style.paidIcon}>
            <Text size="minion" fontVariant="sansBold">
              {paid}
            </Text>
          </div>
        )}
        <Text css={style.hintPrice} size="pica" fontVariant="serifLight">
          {paidStatus ? paidSymbol : priceText}
        </Text>
        <Text css={style.hintSummaryText} size="pica" fontVariant="sansBold">
          {title.length > 0 ? title : 'Hint'}
        </Text>
        {!paidStatus && !isAffordable && (
          <div css={style.notEnough}>
            <Text size="minion" fontVariant="sansBold">
              {notEnoughCredits}
            </Text>
          </div>
        )}
        {paidStatus && (
          <Text css={style.hintAnswerText} size="pica" fontVariant="sansBold">
            {hintText}
          </Text>
        )}
      </button>
    </div>
  );
};
