/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useState } from 'react';
import Text from '../../../Text';
import style from './index.styles';

export type HintData = {
  title: string;
  hintText: string;
  price?: number;
  boughtPrefix?: string;
};

export default ({
  title,
  hintText,
  boughtPrefix = 'Hint',
  price = 250,
}: HintData) => {
  const [paidStatus, setPaidStatus] = useState(false);
  const priceText = `🪙 ${price}`;
  return (
    <details css={style.hintContainer} {...(paidStatus && { disabled: true })}>
      <summary
        css={style.hintSummary}
        onClick={element => {
          setPaidStatus(() => true);
          element.currentTarget.blur();
        }}
        {...(paidStatus && { tabIndex: -1 })}
      >
        <Text css={style.hintPrice} size="pica" fontVariant="serifLight">
          {paidStatus ? boughtPrefix : priceText}
        </Text>
        <Text css={style.hintSummaryText} size="pica" fontVariant="sansBold">
          {title.length > 0 ? title : 'Hint'}
        </Text>
        <div css={style.paidIcon}>
          <Text size="minion" fontVariant="sansBold">
            Paid
          </Text>
        </div>
      </summary>
      <Text css={style.hintAnswerText} size="pica" fontVariant="sansBold">
        {hintText}
      </Text>
    </details>
  );
};
