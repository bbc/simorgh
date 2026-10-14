import { use, useLayoutEffect, useRef, useState } from 'react';
import Heading from '#app/components/Heading';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Text from '../../../Text';
import styles from './index.module.scss';
import Hint, { HintData } from '../HintButton';
import Detail from '../Detail';
import { GameState, RiddleContext } from '../../RiddleProvider';
import { LocalStorageContext } from '../../LocalStorageProvider';
import defaultTranslations from '../defaultTranslations';

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
  const { translations } = use(ServiceContext);
  const { riddle = defaultTranslations } = translations;
  const {
    riddleOfTheDay,
    expiresIn,
    attempts,
    credits,
    answerHere,
    submit,
    outOfAttempts,
  } = riddle;
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
    <div className={styles.container} key={gameIndex}>
      <div className={styles.playArea}>
        <Heading
          level={2}
          size="brevier"
          fontVariant="sansBold"
          className={styles.heading}
        >
          {riddleOfTheDay}
        </Heading>
        <Text
          className={styles.question}
          size="greatPrimer"
          fontVariant="sansBold"
        >
          {question}
        </Text>
        {gameState === GameState.PLAY && (
          <div className={styles.fixedHeight}>
            <div className={styles.hintsArea}>
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
            <form className={styles.inputContainer}>
              <div className={styles.inputUnderline}>
                <input
                  type="text"
                  placeholder={answerHere}
                  className={styles.input}
                  ref={inputRef}
                />
                <div className={styles.underline} />
              </div>
              <button
                type="submit"
                className={styles.submitButton}
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
                  {submit}
                </Text>
              </button>
            </form>
          </div>
        )}
        {gameState === GameState.WINNER && (
          <div className={styles.fixedHeight}>
            <Heading
              level={3}
              className={styles.answerHeading}
              ref={winnerMessageRef}
              tabIndex={-1}
            >
              {capitalise(answer)}
            </Heading>
            <Text as="p" className={styles.didYouKnow}>
              {funFact}
            </Text>
          </div>
        )}
        {gameState === GameState.FAILED && (
          <div className={styles.fixedHeight}>
            <Heading
              level={3}
              className={styles.answerHeading}
              ref={failedMessageRef}
              tabIndex={-1}
            >
              {outOfAttempts}
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
      <div className={styles.detailsArea}>
        <Detail label={expiresIn} content={timeString} as="time" />
        <Detail label={attempts} content={goesString} />
        <Detail label={credits} content={coinsString} />
      </div>
    </div>
  );
};
