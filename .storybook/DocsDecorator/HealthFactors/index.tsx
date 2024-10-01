/** @jsx jsx */
import { jsx } from '@emotion/react';
import path from 'ramda/src/path';
import moment from 'moment';
import Text from '../../../src/app/components/Text';
import { Recommend, Warning, Activity } from './Icons';
import SingleDoc from './SingleDoc';
import styles from './index.styles';
import { HealthFactorsProps } from '../types';
import { getActionCount } from '../../helpers/healthFactors';

const HealthFactors = ({ metadata }: HealthFactorsProps) => {
  const uxAccessibility = path(['uxAccessibilityDoc'], metadata);
  const uxSwarm = path(['swarm'], metadata);
  const acceptanceCriteria = path(['acceptanceCriteria'], metadata);

  const date = new Date(
    Date.parse(
      `${path(['lastUpdated', 'day'], metadata)} ${path(
        ['lastUpdated', 'month'],
        metadata,
      )} ${path(['lastUpdated', 'year'], metadata)}`,
    ),
  );

  const formatDate = moment(date).locale('en').format('Do MMMM YYYY');

  const getLabel = path(['reference', 'label']);
  const getUrl = path(['reference', 'url']);
  const getDone = path(['done']);

  const actionTitles = [
    'Good to show to the audience',
    'One action outstanding',
    'Two actions outstanding',
    'Three actions outstanding',
  ];

  const actionCount = getActionCount(metadata);

  const headline = metadata
    ? actionTitles[actionCount]
    : 'Component health is missing!';

  const hasIcon =
    actionCount === 0 ? (
      <span aria-hidden css={[styles.titleIcon, styles.recommendIcon]}>
        <Recommend css={[styles.icon]} />
      </span>
    ) : (
      <span aria-hidden css={[styles.titleIcon, styles.warningIcon]}>
        <Warning css={[styles.icon]} />
      </span>
    );

  const actionIcon = metadata ? (
    hasIcon
  ) : (
    <span aria-hidden css={[styles.titleIcon, styles.actionIcon]}>
      <Activity css={[styles.icon]} />
    </span>
  );

  return (
    <div css={styles.componentHealthContainer}>
      <div css={styles.headerContainer}>
        <div css={styles.titleContainer}>
          {actionIcon}
          <Text
            size="greatPrimer"
            fontVariant="sansBold"
            as="strong"
            css={styles.title}
          >
            {headline}
          </Text>
        </div>

        {formatDate !== 'Invalid date' && (
          <Text
            size="longPrimer"
            fontVariant="sansRegular"
            css={styles.date}
            as="time"
          >
            {`Last Updated ${formatDate}`}
          </Text>
        )}
      </div>

      <div css={styles.documentationContainer}>
        <ul role="list" css={styles.documentationList}>
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
    </div>
  );
};

export default HealthFactors;
