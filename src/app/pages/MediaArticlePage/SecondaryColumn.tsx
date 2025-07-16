import { Article } from '#app/models/types/optimo';
import LatestMediaSection from './PagePromoSections/LatestMediaSection';
import styles from './MediaArticlePage.styles';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const latestMediaContent = pageData?.secondaryColumn?.latestMedia;
  if (!latestMediaContent) return null;

  return (
    <div className={styles.secondaryColumn}>
      {latestMediaContent && (
        <div data-testid="latest-media" className={styles.responsiveComponentWrapper}>
          <LatestMediaSection content={latestMediaContent} />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
