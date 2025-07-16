import { Summary } from '#app/models/types/curationData';
import Heading from '../Heading';
import styles from './index.module.css';

interface UsefulLinksProps {
  id?: string;
  title: string;
  summaries: Summary[];
}

const UsefulLinks = ({
  title,
  summaries = [],
  id = 'useful-links-1',
}: UsefulLinksProps) => {
  if (summaries.length === 0) {
    return null;
  }

  const hasMultipleSummaries = summaries.length > 1;

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      className={styles.container}
    >
      <Heading level={2} id={id} className={styles.heading}>
        {title}
      </Heading>
      {hasMultipleSummaries ? (
        <ul className={styles.unorderedList} role="list">
          {summaries.map(summary => (
            <li className={styles.item} key={summary.title}>
              <a href={summary.link} className={styles.link}>
                {summary.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.item}>
          <a href={summaries[0].link} className={styles.link}>
            {summaries[0].title}
          </a>
        </div>
      )}
    </section>
  );
};

export default UsefulLinks;
