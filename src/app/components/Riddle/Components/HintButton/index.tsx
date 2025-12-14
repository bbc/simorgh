/** @jsx jsx */
import { jsx } from '@emotion/react';
import { use, useState } from 'react';
import Text from '../../../Text';
import style from './index.styles';
import { LocalStorageContext } from '../../LocalStorageProvider';

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
  const priceText = `🪙 ${price}`;
  const paidStatus = paidHints[index];

  const isAffordable = price <= coins;
  return (
    <div css={style.hintContainer}>
      <button
        type="button"
        css={style.hintButton}
        onClick={() => {
          buyHint(index, price);
        }}
        {...((paidStatus || !isAffordable) && { disabled: true })}
      >
        {paidStatus && (
          <div css={style.paidIcon}>
            <Text size="minion" fontVariant="sansBold">
              Paid
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
              Not enough credits
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
