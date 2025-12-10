/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useMemo, useState, useEffect, use } from 'react';
import Text from '../../../Text';
import style from './index.styles';
import Hint, { HintData } from '../Hint';
import Detail from '../Detail';
import { RiddleContext } from '../../RiddleProvider';
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
  const { gameData, devTime } = use(RiddleContext);
  const { goes, coins } = use(LocalStorageContext);
  const { question, hint1, hint2, answer, expire } = gameData;

  const [initialTime, expiryTime] = useMemo(() => {
    const currDate = devTime;
    const expiryDate = new Date(expire);
    return [currDate, expiryDate];
  }, [devTime, expire]);

  const [initialHourDelta, initialMinuteDelta, initialSecondDelta] =
    getTimeDiff(expiryTime, initialTime);

  const [hour, setHour] = useState(initialHourDelta);
  const [minute, setMinute] = useState(initialMinuteDelta);
  const [second, setSecond] = useState(initialSecondDelta);

  useEffect(() => {
    const timer = setInterval(() => {
      const currTime = devTime;
      const [hoursToGo, minutesToGo, secondsToGo] = getTimeDiff(
        expiryTime,
        currTime,
      );
      setHour(hoursToGo);
      setMinute(minutesToGo);
      setSecond(secondsToGo);
    }, 500);

    return () => clearInterval(timer);
  }, [initialTime, expiryTime, devTime]);

  let timeString = `-`;
  if (hour > -1) {
    timeString = `${hour < 10 ? '0' : ''}${hour}h ${minute < 10 ? '0' : ''}${minute}m ${second < 10 ? '0' : ''}${second}s`;
  }

  const goesString = `${goes}/5`;
  const coinsString = `🪙 ${coins}`;

  return (
    <div css={style.container}>
      <div css={style.playArea}>
        <Text css={style.question} size="greatPrimer" fontVariant="sansBold">
          {question}
        </Text>
        <div css={style.hintsArea}>
          <Hint {...hint1} />
          <Hint {...hint2} />
          <Hint
            title="Answer"
            hintText={answer}
            price={2500}
            boughtPrefix="Answer"
          />
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
        <Detail label="Expires in" content={timeString} as="time" />
        <Detail label="Attempts" content={goesString} />
        <Detail label="Credits" content={coinsString} />
      </div>
    </div>
  );
};
