/** @jsxImportSource @emotion/react */
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

interface TimeProps {
  time: {
    displayTimeUK: string;
    accessibleTime: string;
  };
  isConciseView?: boolean;
}

const Time = ({ time }: TimeProps) => (
  <>
    <time css={styles.fixtureTime()} aria-hidden="true">
      {time.displayTimeUK}
    </time>
    <VisuallyHiddenText>{time.accessibleTime}</VisuallyHiddenText>
  </>
);

export default Time;
