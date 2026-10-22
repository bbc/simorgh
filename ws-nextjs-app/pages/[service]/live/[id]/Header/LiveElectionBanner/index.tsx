import ElectionBanner from '#app/components/ElectionBanner';
import { MetadataTaggings } from '#app/models/types/metadata';
import styles from './index.module.scss';

type Props = {
  taggings: MetadataTaggings;
};

// Live page composition of ElectionBanner: owns the full-bleed background and
// supplies the style overrides needed on this page, rather than ElectionBanner
// branching on which page it's rendered on.
const LiveElectionBanner = ({ taggings }: Props) => (
  <div className={styles.background}>
    <ElectionBanner
      taggings={taggings}
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
