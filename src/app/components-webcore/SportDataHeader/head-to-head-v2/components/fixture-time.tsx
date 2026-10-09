import { useEffect, useState } from 'react';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import { getLocalisedTime } from '../helpers/localise-datetime';

interface TimeData {
  displayTimeUK: string;
  accessibleTime: string;
}

interface TimeProps {
  date: string;
  time: TimeData;
}

const Time = ({ date, time }: TimeProps) => {
  const [localisedTime, setLocalisedTime] = useState(time.displayTimeUK);

  useEffect(() => {
    const clientTime = getLocalisedTime(date, time.displayTimeUK);
    setLocalisedTime(clientTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <time css={styles.fixtureTime} aria-hidden="true">
        {localisedTime}
      </time>

      <VisuallyHiddenText>{localisedTime}</VisuallyHiddenText>
    </>
  );
};

export default Time;
