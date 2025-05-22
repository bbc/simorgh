/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import Heading from '../Heading';
import styles from './index.styles';

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
      css={styles.container}
    >
      <Heading level={2} id={id} css={styles.heading}>
        {title}
      </Heading>
      {hasMultipleSummaries ? (
        <ul css={styles.unorderedList} role="list">
          {summaries.map(summary => (
            <li css={styles.item} key={summary.title}>
              <a href={summary.link} css={styles.link}>
                {summary.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div css={styles.item}>
          <a href={summaries[0].link} css={styles.link}>
            {summaries[0].title}
          </a>
        </div>
      )}
    </section>
  );
};

export default UsefulLinks;
