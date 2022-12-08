import React from 'react';
import count from 'ramda/src/count';
import path from 'ramda/src/path';
import moment from 'moment';
import Text from '../../../src/app/components/Text';
import { Recommend, Warning, Activity } from './Icons/icons';
import SingleDoc from './SingleDoc';
import styles from './index.styles';
import HealthFactorMetadata from '../types';

const HealthFactor = ({ metadata }: { metadata?: HealthFactorMetadata }) => {
  const uxAccessibility = path(['uxAccessibilityDoc'], metadata);
  const uxSwarm = path(['swarm'], metadata);
  const acceptanceCriteria = path(['acceptanceCriteria'], metadata);

  const isAlpha = path(['alpha'], metadata);

  const date = new Date(
    Date.parse(
      `${path(['lastUpdated', 'day'], metadata)} ${path(
        ['lastUpdated', 'month'],
        metadata,
      )} ${path(['lastUpdated', 'year'], metadata)}`,
    ),
  );

  const formatDate = moment(date).format('Do MMMM YYYY');

  const getLabel = path(['reference', 'label']);
  const getUrl = path(['reference', 'url']);
  const getDone = path(['done']);

  const actionTitles = [
    'Good to show to the audience',
    'One action outstanding',
    'Two actions outstanding',
    'Three actions outstanding',
  ];

  const actionCount = count(
    x => typeof x === 'undefined' || !getDone(x),
    [uxAccessibility, uxSwarm, acceptanceCriteria],
  );

  const headline = metadata
    ? actionTitles[actionCount]
    : 'Component health is missing!';

  const hasIcon =
    actionCount === 0 ? (
      <Recommend css={[styles.icon, styles.recommendIcon]} />
    ) : (
      <Warning css={[styles.icon, styles.warningIcon]} />
    );

  const actionIcon = metadata ? (
    hasIcon
  ) : (
    <Activity css={[styles.icon, styles.warningIcon]} />
  );

  return (
    <aside css={styles.componentHealthContainer}>
      <div css={styles.headerContainer}>
        <div css={styles.titleContainer}>
          <span aria-hidden css={styles.titleIcon}>
            {actionIcon}
          </span>
          <Text size="doublePica" fontVariant="sansBold" as="strong">
            {headline}
          </Text>
        </div>

        {formatDate !== 'Invalid date' && (
          <Text
            size="bodyCopy"
            fontVariant="sansRegular"
            css={styles.date}
            as="time"
          >
            {`Last Updated ${formatDate}`}
          </Text>
        )}
      </div>

      <div css={styles.documentationContainer}>
        {isAlpha && (
          <p>
            <Text size="bodyCopy" fontVariant="sansRegular">
              This component is tagged alpha and is not suitable for use on
              live. Upon the completion of all health checks the component is
              ready for use on live and the alpha tag will be removed.
            </Text>
          </p>
        )}

        <ul css={styles.documentationList}>
          <SingleDoc
            label="Screen reader UX"
            url={
              (getDone(uxAccessibility) as boolean)
                ? (getUrl(uxAccessibility) as string)
                : 'https://bbc.github.io/accessibility-news-and-you/guides/screen-reader-ux.html'
            }
            status={getDone(uxAccessibility) as boolean}
            urlLabel={
              (getLabel(uxAccessibility) as string) ||
              'How to document the screen reader UX'
            }
          />
          <SingleDoc
            label="Accessibility Acceptance Criteria"
            url={
              (getDone(acceptanceCriteria) as boolean)
                ? (getUrl(acceptanceCriteria) as string)
                : 'https://bbc.github.io/accessibility-news-and-you/guides/accessibility-acceptance-criteria.html'
            }
            status={getDone(acceptanceCriteria) as boolean}
            urlLabel={
              (getLabel(acceptanceCriteria) as string) ||
              'How to write accessibility acceptance criteria'
            }
          />
          <SingleDoc
            label="Accessibility Swarm"
            url={
              (getDone(uxSwarm) as boolean)
                ? (getUrl(uxSwarm) as string)
                : 'https://bbc.github.io/accessibility-news-and-you/guides/accessibility-swarms.html'
            }
            status={getDone(uxSwarm) as boolean}
            urlLabel={
              (getLabel(uxSwarm) as string) ||
              'How to run an accessibility swarm'
            }
          />
        </ul>
      </div>
    </aside>
  );
};

export default HealthFactor;
