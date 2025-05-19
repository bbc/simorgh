/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { Summary } from '#app/models/types/curationData';
import { ServiceContext } from '#app/contexts/ServiceContext';
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
  const { dir } = useContext(ServiceContext);

  // Early return if no summaries are provided
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
      <Heading level={2} id={id} css={styles.heading} dir={dir}>
        {title}
      </Heading>
      {hasMultipleSummaries ? (
        <ul css={styles.unorderedList} dir={dir} role="list">
          {summaries.map(summary => (
            <li css={styles.item} key={summary.title}>
              <a href={summary.link} css={styles.link}>
                <span>{summary.title}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        // When only one summary, render a single div
        <div css={styles.item} dir={dir}>
          <a href={summaries[0].link} css={styles.link}>
            <span>{summaries[0].title}</span>
          </a>
        </div>
      )}
    </section>
  );
};

export default UsefulLinks;
