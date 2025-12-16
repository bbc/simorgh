/** @jsxFrag React.Fragment */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, {
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
  funFact: string;
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

const capitalise = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default () => {
  const {
    gameData,
    devTime,
    gameIndex,
    submitAttempt,
    gameState,
    revealAnswer,
  } = use(RiddleContext);
  const { goes, coins } = use(LocalStorageContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const { question, hint1, hint2, answer, expire, funFact } = gameData;
  const failedMessageRef = useRef<HTMLHeadingElement>(null);
  const winnerMessageRef = useRef<HTMLHeadingElement>(null);
  const [isInvoked, setIsInvoked] = useState(false);
  const expiryDate = new Date(expire);
  const currTime = devTime;
  const [hour, minute, second] = getTimeDiff(expiryDate, currTime);

  let timeString = `-`;
  if (hour > -1) {
    timeString = `${hour < 10 ? '0' : ''}${hour}h ${minute < 10 ? '0' : ''}${minute}m ${second < 10 ? '0' : ''}${second}s`;
  }

  const goesString = `${goes}/5`;
  const coinsString = `🪙 ${coins}`;

  useLayoutEffect(() => {
    if (isInvoked) {
      if (gameState === GameState.WINNER) {
        winnerMessageRef.current?.focus();
      }
      if (gameState === GameState.FAILED) {
        failedMessageRef.current?.focus();
      }
      setIsInvoked(false);
    }
  }, [isInvoked, gameState]);

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
          <div css={style.fixedHeight}>
            <div css={style.hintsArea}>
              <Hint {...hint1} index={0} />
              <Hint {...hint2} index={1} />
              <Hint
                title="Answer"
                hintText={answer}
                price={2500}
                paidSymbol="Answer"
                index={2}
                onClickFn={() => {
                  revealAnswer(2500);
                  setIsInvoked(true);
                }}
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
                    const isCorrect = submitAttempt(userInput);
                    if (isCorrect !== GameState.PLAY) {
                      setIsInvoked(true);
                    }
                  }
                }}
              >
                <Text size="longPrimer" fontVariant="sansBold">
                  Submit
                </Text>
              </button>
            </form>
          </div>
        )}
        {gameState === GameState.WINNER && (
          <div css={style.fixedHeight}>
            <Heading
              level={3}
              css={style.answerHeading}
              ref={winnerMessageRef}
              tabIndex={-1}
            >
              {capitalise(answer)}
            </Heading>
            <Text as="p" css={style.didYouKnow}>
              {funFact}
            </Text>
          </div>
        )}
        {gameState === GameState.FAILED && (
          <div css={style.fixedHeight}>
            <Heading
              level={3}
              css={style.answerHeading}
              ref={failedMessageRef}
              tabIndex={-1}
            >
              {`You've run out of attempts!`}
            </Heading>
            <Hint
              title="Answer"
              hintText={answer}
              price={2500}
              paidSymbol="Answer"
              index={2}
              onClickFn={() => {
                revealAnswer(2500);
                setIsInvoked(true);
              }}
            />
          </div>
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
