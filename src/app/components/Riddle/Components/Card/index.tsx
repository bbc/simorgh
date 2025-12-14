/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { use, useRef } from 'react';
import Heading from '#app/components/Heading';
import Text from '../../../Text';
import style from './index.styles';
import Hint, { HintData } from '../HintButton';
import Detail from '../Detail';
import { GameState, RiddleContext } from '../../RiddleProvider';
import { LocalStorageContext } from '../../LocalStorageProvider';

export type GameData = {
  expire: string;
  question: string;
  hint1: HintData;
  hint2: HintData;
  answer: string;
};

const getTimeDiff = (a: Date, b: Date) => {
  const timeDelta = a.getTime() - b.getTime();
  const secondsDelta = timeDelta / 1000;
  const minutesDelta = Math.floor(timeDelta / (1000 * 60));
  const hoursToGo = Math.floor(timeDelta / (1000 * 60 * 60));
  const minutesToGo = minutesDelta - hoursToGo * 60;
  const secondsToGo = Math.floor(secondsDelta - minutesDelta * 60);

  return [hoursToGo, minutesToGo, secondsToGo];
};

export default () => {
  const { gameData, devTime, gameIndex, submitAttempt, gameState } =
    use(RiddleContext);
  const { goes, coins } = use(LocalStorageContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { question, hint1, hint2, answer, expire } = gameData;

  const expiryDate = new Date(expire);
  const currTime = devTime;
  const [hour, minute, second] = getTimeDiff(expiryDate, currTime);

  let timeString = `-`;
  if (hour > -1) {
    timeString = `${hour < 10 ? '0' : ''}${hour}h ${minute < 10 ? '0' : ''}${minute}m ${second < 10 ? '0' : ''}${second}s`;
  }

  const goesString = `${goes}/5`;
  const coinsString = `🪙 ${coins}`;

  return (
    <div css={style.container} key={gameIndex}>
      <div css={style.playArea}>
        <Heading
          level={2}
          size="brevier"
          fontVariant="sansBold"
          css={style.heading}
        >
          Riddle of the day
        </Heading>
        <Text css={style.question} size="greatPrimer" fontVariant="sansBold">
          {question}
        </Text>

        {gameState === GameState.PLAY && (
          <>
            <div css={style.hintsArea}>
              <Hint {...hint1} index={0} />
              <Hint {...hint2} index={1} />
              <Hint
                title="Answer"
                hintText={answer}
                price={2500}
                paidSymbol="Answer"
                index={2}
              />
            </div>
            <form css={style.inputContainer}>
              <div css={style.inputUnderline}>
                <input
                  type="text"
                  placeholder="Answer here..."
                  css={style.input}
                  ref={inputRef}
                />
                <div css={style.underline} />
              </div>
              <button
                type="submit"
                css={style.submitButton}
                onClick={event => {
                  event.preventDefault();
                  const userInput = inputRef.current?.value;
                  if (userInput) {
                    submitAttempt(userInput);
                  }
                }}
              >
                <Text size="longPrimer" fontVariant="sansBold">
                  Submit
                </Text>
              </button>
            </form>
          </>
        )}
        {gameState === GameState.WINNER && (
          <>
            <Heading level={3} css={style.answerHeading}>
              {answer}
            </Heading>
            <Text as="p" fontVariant="serif" css={style.didYouKnow}>
              Did you know? Unlike diesel-electric submarines, which need to
              surface or snorkel to recharge batteries, nuclear submarines use a
              nuclear reactor to generate power, allowing them to produce their
              own oxygen and fresh water. The main limiting factor for how long
              they can stay underwater is food supply for the crew, not fuel or
              air.
            </Text>
          </>
        )}
      </div>
      <div css={style.detailsArea}>
        <Detail label="Expires in" content={timeString} as="time" />
        <Detail label="Attempts" content={goesString} />
        <Detail label="Credits" content={coinsString} />
      </div>
    </div>
  );
};
