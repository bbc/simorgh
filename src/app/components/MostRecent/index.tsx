import Heading from '#app/components/Heading';
import InlineLink from '#app/components/InlineLink';
import { MostRecentData } from './types';
import styles from './index.module.scss';

interface MostRecentProps {
  data?: MostRecentData | null;
  showSectionLabel?: boolean;
  heading?: string;
}

const MostRecent = ({
  data,
  showSectionLabel = true,
  heading = 'Most recent',
}: MostRecentProps) => {
  if (!data?.items?.length) {
    return null;
  }

  return (
    <section
      className={styles.section}
      data-testid="most-recent"
      {...(showSectionLabel
        ? {
            role: 'region',
            'aria-labelledby': 'most-recent-heading',
          }
        : {})}
    >
      {showSectionLabel && (
        <Heading level={2} className={styles.heading} id="most-recent-heading">
          {heading}
        </Heading>
      )}
      <ul className={styles.list}>
        {data.items.map(({ id, headline, href, timeAgo }) => (
          <li key={id} className={styles.item}>
            <InlineLink to={href} className={styles.link}>
              {headline}
            </InlineLink>
            <span className={styles.timeAgo}>{timeAgo}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export type { MostRecentProps };
export default MostRecent;
