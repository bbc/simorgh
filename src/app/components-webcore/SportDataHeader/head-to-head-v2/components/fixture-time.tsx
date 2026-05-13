import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

interface TimeData {
  displayTimeUK: string;
  accessibleTime: string;
}

interface TimeProps {
  time: TimeData;
}

const Time = ({ time }: TimeProps) => (
  <>
    <time css={styles.fixtureTime} aria-hidden="true">
      {time.displayTimeUK}
    </time>
    <VisuallyHiddenText>{time.accessibleTime}</VisuallyHiddenText>
  </>
);

export default Time;
