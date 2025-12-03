/** @jsx jsx */
import { jsx } from '@emotion/react';
import style from './index.styles';
import Text from '../Text';

export type HintData = {
  title: string;
  hintText: string;
  price: number;
};

export type GameData = {
  utcExpire: string;
  question: string;
  hint1: HintData;
  hint2: HintData;
  answer: string;
};

export type CachedGameData = {
  goes: number;
  credits: number;
};

const Hint = ({ title, hintText, price = 250 }: HintData) => {
  return (
    <details css={style.hintContainer}>
      <summary css={style.hintSummary}>
        <Text css={style.hintPrice} size="pica" fontVariant="serifLight">
          C{price}
        </Text>
        <Text css={style.hintSummaryText} size="pica" fontVariant="sansBold">
          {title.length > 0 ? title : 'Hint'}
        </Text>
      </summary>
      <Text css={style.hintAnswerText} size="pica" fontVariant="sansBold">
        {hintText}
      </Text>
    </details>
  );
};

export default () => {
  const gameData = {
    utcExpire: '500-25-26',
    question:
      "I'm surrounded by water, but I never drink. I can swim for miles, but I never breathe. I have only one eye, but I never blink. What am I?",
    hint1: {
      title: 'Begins with an...',
      hintText: 'Begins with an s',
    },
    hint2: {
      title: '',
      hintText: 'Begins with an s',
    },
    answer: 'submarine',
  } as GameData;

  const { question, hint1, hint2, answer } = gameData;

  return (
    <div css={style.container}>
      <div css={style.playArea}>
        <Text css={style.question} size="greatPrimer" fontVariant="sansBold">
          {question}
        </Text>
        <div css={style.hintsArea}>
          <Hint {...hint1} />
          <Hint {...hint2} />
          <Hint title="Answer" hintText={answer} price={2500} />
        </div>
        <div css={style.inputContainer}>
          <div css={style.inputUnderline}>
            <input type="text" placeholder="Answer here..." css={style.input} />
            <div css={style.underline} />
          </div>
          <button type="submit" css={style.submitButton}>
            <Text size="longPrimer" fontVariant="sansBold">
              Submit
            </Text>
          </button>
        </div>
      </div>
      <div css={style.detailsArea}>
        <div css={style.detail}>
          <span>Expires in:</span>
          <span>
            <time>24h 5min</time>
          </span>
        </div>
        <div css={style.detail}>
          <span>Goes:</span>
          <span>4/5</span>
        </div>
        <div css={style.detail}>
          <span>Credits:</span>
          <span>C 700</span>
        </div>
      </div>
    </div>
  );
};
