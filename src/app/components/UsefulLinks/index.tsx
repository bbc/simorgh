import { Summary } from '#app/models/types/curationData';
import useViewTracker from '#app/hooks/useViewTracker';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import Heading from '../Heading';
import styles from './index.styles';

export type UsefulLinksLayout = 'single' | 'double';

interface UsefulLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
  eventTrackingData?: EventTrackingMetadata;
  layout?: UsefulLinksLayout;
  headingLevel?: 1 | 2 | 3 | 4;
  className?: string;
}

const UsefulLinks = ({
  title,
  summaries = [],
  id = 'useful-links-1',
  eventTrackingData,
  layout = 'double',
  headingLevel = 2,
  className,
}: UsefulLinksProps) => {
  const viewTracker = useViewTracker(eventTrackingData);
  const getClickTrackerHandler = useClickTrackerHandler;
  if (summaries.length === 0) {
    return null;
  }
  const hasMultipleSummaries = summaries.length > 1;
  const buildPromoEventTrackingData = (promo: Summary, i: number) => {
    const itemTracker = {
      type: 'useful-link-promo',
      text: promo.title,
      position: i + 1,
      resourceId: promo.id,
    };
    return {
      itemTracker,
      ...eventTrackingData,
    };
  };
  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      css={styles.container}
      {...viewTracker}
      className={className}
    >
      <Heading level={headingLevel} id={id} css={styles.heading}>
        {title}
      </Heading>
      {hasMultipleSummaries ? (
        <ul css={styles.unorderedList(layout)} role="list">
          {summaries.map((summary, i) => {
            const promoEventTrackingData = buildPromoEventTrackingData(
              summary,
              i,
            );
            const clickTrackerHandler = getClickTrackerHandler(
              promoEventTrackingData,
            );
            return (
              <li css={styles.item} key={summary.title}>
                <a
                  href={summary.link}
                  css={styles.link}
                  {...clickTrackerHandler}
                >
                  {summary.title}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <div css={styles.item}>
          <a
            href={summaries[0].link}
            css={styles.link}
            {...getClickTrackerHandler(
              buildPromoEventTrackingData(summaries[0], 0),
            )}
          >
            {summaries[0].title}
          </a>
        </div>
      )}
    </section>
  );
};

export default UsefulLinks;
