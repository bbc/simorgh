import useHydrationDetection from '#app/hooks/useHydrationDetection';
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
  const isHydrated = useHydrationDetection();
  const localisedTime = isHydrated
    ? getLocalisedTime(date, time.displayTimeUK)
    : time.displayTimeUK;

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
