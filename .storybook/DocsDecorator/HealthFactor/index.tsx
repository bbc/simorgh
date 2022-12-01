import React from 'react';
import count from 'ramda/src/count';
import path from 'ramda/src/path';
import Heading from '../../../src/app/components/Heading';
import Text from '../../../src/app/components/Text';
import { Recommend, Warning, Activity } from './Icons/icons';
import SingleDoc from './SingleDoc';
import styles from './index.styles';
import HealthFactorMetadata from '../types';
import moment from 'moment';

const HealthFactor = ({ metadata }: { metadata?: HealthFactorMetadata }) => {
  const uxAccessibility = path(['uxAccessibilityDoc'], metadata);
  const uxSwarm = path(['swarm'], metadata);
  const acceptanceCriteria = path(['acceptanceCriteria'], metadata);

  const alpha = path(['alpha'], metadata);

  const date = new Date(
    Date.parse(
      `${path(['last_updated', 'day'], metadata)} ${path(
        ['last_updated', 'month'],
        metadata,
      )} ${path(['last_updated', 'year'], metadata)}`,
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
      <Recommend css={styles.recommendIcon} />
    ) : (
      <Warning css={styles.warningIcon} />
    );

  const actionIcon = metadata ? hasIcon : <Activity css={styles.warningIcon} />;

  return (
    <aside css={styles.componentHealthContainer}>
      <div css={styles.headerContainer}>
        <div css={styles.titleContainer}>
          <span aria-hidden css={styles.titleIcon}>
            {actionIcon}
          </span>
          <Heading size="doublePica" level={2}>
            {headline}
          </Heading>
        </div>

        <time css={styles.date}>
          <Text size="bodyCopy" fontVariant="sansRegular">
            {`Last Updated ${formatDate}`}
          </Text>
        </time>
      </div>

      <div css={styles.documentationContainer}>
        {alpha && (
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
                : 'https://confluence.dev.bbc.co.uk/display/NEWSWORLDSERVICE/A11y+Swarms'
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
