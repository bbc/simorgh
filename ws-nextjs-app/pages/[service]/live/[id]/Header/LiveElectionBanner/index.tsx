import ElectionBanner from '#app/components/ElectionBanner';
import styles from './index.module.scss';

// Live page composition of ElectionBanner: owns the full-bleed background and
// supplies the style overrides needed on this page, rather than ElectionBanner
// branching on which page it's rendered on.
const LiveElectionBanner = () => (
  <div className={styles.background}>
    <ElectionBanner
      overrideClassnames={{
        wrapper: styles.wrapper,
        assocPressWrapper: styles.assocPressWrapper,
        iframe: styles.iframe,
        title: styles.title,
      }}
    />
  </div>
);

export default LiveElectionBanner;
