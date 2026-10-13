import { use, useState } from 'react';
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
      css={style.hintContainer}
      {...((paidStatus || !isAffordable) && {
        disabled: true,
        'aria-hidden': 'true',
      })}
      {...(paidStatus && !isInvoked && { open: true })}
    >
      <summary
        css={style.hintSummary}
        onClick={event => {
          buyHint(index, price);
          setIsInvoked(true);
          event.currentTarget.blur();
        }}
        {...((paidStatus || !isAffordable) && { tabIndex: -1 })}
      >
        <Text css={style.hintPrice} size="pica" fontVariant="serifLight">
          {paidStatus ? paidSymbol : priceText}
        </Text>
        <Text css={style.hintSummaryText} size="pica" fontVariant="sansBold">
          {title.length > 0 ? title : 'Hint'}
        </Text>
        <div css={style.paidIcon}>
          <Text size="minion" fontVariant="sansBold">
            {paid}
          </Text>
        </div>
        {!paidStatus && !isAffordable && (
          <div css={style.notEnough}>
            <Text size="minion" fontVariant="sansBold">
              {notEnoughCredits}
            </Text>
          </div>
        )}
      </summary>
      <Text css={style.hintAnswerText} size="pica" fontVariant="sansBold">
        {hintText}
      </Text>
    </details>
  );
};
