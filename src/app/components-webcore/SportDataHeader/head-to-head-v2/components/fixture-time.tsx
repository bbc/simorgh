import { useEffect, useState } from 'react';
// import onClient from '#app/lib/utilities/onClient';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from '../index.styles';
import getLocalisedTime from '../helpers/localise-time';

interface TimeData {
  displayTimeUK: string;
  accessibleTime: string;
}

interface TimeProps {
  date: string;
  time: TimeData;
}

const Time = ({ date, time }: TimeProps) => {
  const [localisedTime, setLocalisedTime] = useState<string | null>(null);

  useEffect(() => {
    setLocalisedTime(getLocalisedTime(date, time.displayTimeUK));
  }, [date, time.displayTimeUK]);

  const displayedTime = localisedTime ?? time.displayTimeUK;

  return (
    <>
      <time
        css={styles.fixtureTime}
        aria-hidden="true"
        suppressHydrationWarning
      >
        {displayedTime}
      </time>

      <VisuallyHiddenText suppressHydrationWarning>
        {displayedTime}
      </VisuallyHiddenText>
    </>
  );
};

export default Time;
