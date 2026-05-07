import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';
import styles from './index.styles';

const Time = ({ time }) => (
  <>
    <time css={styles.fixtureTime()} aria-hidden="true">
      {time.displayTimeUK}
    </time>
    <VisuallyHiddenText>{time.accessibleTime}</VisuallyHiddenText>
  </>
);

export default Time;
