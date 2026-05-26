import type { Article } from '#app/models/types/optimo';
import styles from './MediaArticlePage.styles';
import LatestMediaSection from './PagePromoSections/LatestMediaSection';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const latestMediaContent = pageData?.secondaryColumn?.latestMedia;
  if (!latestMediaContent) return null;

  return (
    <div css={styles.secondaryColumn}>
      {latestMediaContent && (
        <div data-testid="latest-media" css={styles.responsiveComponentWrapper}>
          <LatestMediaSection content={latestMediaContent} />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
