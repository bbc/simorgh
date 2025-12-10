import { Article } from '#app/models/types/optimo';
import { RequestContext } from '#app/contexts/RequestContext';
import { use } from 'react';
import LatestMediaSection from './PagePromoSections/LatestMediaSection';
import styles from './MediaArticlePage.styles';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const latestMediaContent = pageData?.secondaryColumn?.latestMedia;
  if (!latestMediaContent) return null;
  const { isLite } = use(RequestContext);

  return (
    <div css={styles.secondaryColumn}>
      {latestMediaContent && (
        <div data-testid="latest-media" css={styles.responsiveComponentWrapper}>
          <LatestMediaSection content={latestMediaContent} isLite={isLite} />
        </div>
      )}
    </div>
  );
};

export default SecondaryColumn;
