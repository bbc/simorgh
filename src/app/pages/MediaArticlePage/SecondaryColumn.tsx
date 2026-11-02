import { Article } from '#app/models/types/optimo';
import OnwardJourneyPlaceholder from '#app/components/OnwardJourneyPlaceholder';
import { useOnwardJourneyRequest } from '#app/contexts/ArticleOnwardJourneysContext';
import LatestMediaSection from './PagePromoSections/LatestMediaSection';
import styles from './MediaArticlePage.styles';

const SecondaryColumn = ({ pageData }: { pageData: Article }) => {
  const latestMediaContent = pageData?.secondaryColumn?.latestMedia;
  const onwardJourneyContext = useOnwardJourneyRequest();

  if (!latestMediaContent && !onwardJourneyContext?.isEnabled) return null;

  return (
    <div css={styles.secondaryColumn}>
      {latestMediaContent && (
        <div data-testid="latest-media" css={styles.responsiveComponentWrapper}>
          <LatestMediaSection content={latestMediaContent} />
        </div>
      )}
      {!latestMediaContent && (
        <OnwardJourneyPlaceholder onwardJourney="latestMedia" />
      )}
    </div>
  );
};

export default SecondaryColumn;
