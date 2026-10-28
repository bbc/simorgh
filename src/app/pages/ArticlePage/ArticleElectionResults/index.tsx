import { use, CSSProperties } from 'react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import {
  ElectionMetric,
  ElectionStatus,
  ElectionResults as ElectionResultsData,
} from '#app/models/types/elections';
import styles from './index.module.scss';

type Props = {
  results: ElectionResultsData;
  aboutTags?: Tag[];
  taggings?: MetadataTaggings;
};

const show = (value: unknown) =>
  value === null || value === undefined || value === ''
    ? 'null'
    : String(value);

// Replaces {returned} / {total} style placeholders in translation strings
const fill = (template: string, values: Record<string, unknown>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => show(values[key]));

const formatTime = (epochSeconds?: number | null) =>
  epochSeconds
    ? new Date(epochSeconds * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '';

const OTHERS_COLOUR = '#bbbbbb';

const ArticleElectionResults = ({ results, aboutTags, taggings }: Props) => {
  // `use` must be called before any early return
  const { translations } = use(ServiceContext);
  const t = translations?.electionResultsBanner;

  if (!results) return null;

  // TEMP: local testing only. Revert before committing.
  const hasMatchingTag = Boolean(aboutTags?.length);
  const isEditoriallySensitive = Boolean(taggings?.length && false);
  void hasMatchingTag;
  if (isEditoriallySensitive) return null;

  const {
    title,
    status: statusFromData,
    lastUpdated,
    reporting,
    CTA,
    candidates,
  } = results;

  // TEMP: local testing only. Revert before committing.
  // Options: ElectionStatus.NOT_YET_STARTED | COUNTING | FINISHED | null (use real data)
  const FORCE_STATUS: ElectionStatus | null = ElectionStatus.COUNTING;
  const status = FORCE_STATUS ?? statusFromData;

  const isPreResults = status === ElectionStatus.NOT_YET_STARTED;
  const isCounting = status === ElectionStatus.COUNTING;
  const isFinal = status === ElectionStatus.FINISHED;

  const rows = (candidates ?? []).map(candidate => {
    const vote = candidate.result?.conditions?.find(
      condition => condition?.id === ElectionMetric.VOTE,
    );
    const spread = candidate.result?.conditions?.find(
      condition => condition?.id === ElectionMetric.GEOGRAPHIC_SPREAD,
    );

    // TEMP: backend sends the same numbers for every status, so zero them
    // out for the awaiting screen. Remove once real data is available.
    const votesPercentage = isPreResults ? 0 : vote?.votesPercentage;

    return {
      candidate,
      vote,
      spread,
      votesPercentage,
      percent: Number(votesPercentage) || 0,
    };
  });

  // "Others" is not in the data, so it is the remainder of 100%.
  const othersPercent = isPreResults
    ? 0
    : Math.max(
        0,
        Math.round(100 - rows.reduce((sum, row) => sum + row.percent, 0)),
      );

  const maxPercent = Math.max(
    ...rows.map(row => row.percent),
    othersPercent,
    1,
  );

  // `outcome` is boolean | null. TEMP: falls back to the first candidate so
  // the winner banner can be tested. Remove the `?? rows[0]` before committing.
  const winner = isFinal
    ? (rows.find(({ candidate }) => Boolean(candidate.result?.outcome)) ??
      rows[0])
    : undefined;

  const barStyle = (colour: string | undefined, percent: number) =>
    ({
      '--party-colour': colour,
      '--bar-width': (percent / maxPercent) * 100,
    }) as CSSProperties;

  const percentClass = `${styles.percent} ${
    isPreResults ? styles.percentAwaiting : ''
  }`;

  const lastUpdatedText = `${t?.lastUpdated ?? 'Last updated:'} ${show(
    formatTime(lastUpdated),
  )}`;

  console.log('RESULT CONDITIONS!!!!!', candidates?.[0]?.result?.conditions);

  return (
    <section
      className={styles.wrapper}
      data-testid="election-results-wireframe"
    >
      <h2 className={styles.title}>{show(title)}</h2>

      <p className={styles.subtitle}>
        {/* TODO: "Results awaiting" is not in the translations yet */}
        {isPreResults ? 'Results awaiting' : lastUpdatedText}
      </p>

      {winner && (
        <div
          className={styles.winner}
          style={
            {
              '--party-colour': winner.candidate.party?.colour,
            } as CSSProperties
          }
        >
          <div
            className={styles.winnerImage}
            style={{ backgroundImage: `url(${winner.candidate.image})` }}
          />
          {/* TODO: "wins majority" is not in the translations yet */}
          <strong className={styles.winnerText}>
            {show(winner.candidate.name)} wins majority
          </strong>
        </div>
      )}

      {/* TODO: "Results" is not in the translations yet */}
      {isFinal && <h3 className={styles.resultsHeading}>Results</h3>}

      <ul className={styles.candidates}>
        {rows.map(({ candidate, spread, votesPercentage, percent }) => (
          <li key={candidate.id} className={styles.candidate}>
            <span className={styles.name}>
              {show(candidate.name)} ({show(candidate.party?.shortName)})
            </span>
            <div
              className={styles.barRow}
              style={barStyle(candidate.party?.colour, percent)}
            >
              {!isPreResults && <div className={styles.bar} />}
              <span className={percentClass}>{show(votesPercentage)}%</span>
              {!isFinal && (
                <span className={styles.spread}>
                  {t?.spread ?? 'Spread'}{' '}
                  {show(spread?.achievedAreas ?? reporting?.returned)}/{show(reporting?.total)}
                </span>
              )}
            </div>
          </li>
        ))}

        <li className={styles.candidate}>
          {/* TODO: "Others" is not in the translations yet */}
          <span className={styles.name}>Others</span>
          <div
            className={styles.barRow}
            style={barStyle(OTHERS_COLOUR, othersPercent)}
          >
            {!isPreResults && <div className={styles.bar} />}
            <span className={percentClass}>{othersPercent}%</span>
          </div>
        </li>
      </ul>

      <p className={styles.statesCounted}>
        {fill(
          t?.statesCounted ?? '{returned} of {total} states counted',
          {
            returned: reporting?.returned,
            total: reporting?.total,
          },
        )}
      </p>

      {/* The new frames don't show these buttons, so they only appear during
          the count for now. Confirm with design. */}
      {isCounting && (
        <div className={styles.actions}>
          {/* TODO: LIVE updates needs its own link field in the data */}
          <a className={`${styles.button} ${styles.live}`} href={CTA?.link}>
            <span className={styles.liveDot} aria-hidden="true" />
            <strong>{t?.live ?? 'LIVE'}</strong>&nbsp;
            {t?.liveUpdates ?? 'updates'}
          </a>
          <a className={styles.button} href={CTA?.link}>
            {show(CTA?.text)}
          </a>
          {/* TODO: needs real content/link */}
          <button type="button" className={styles.howItWorks}>
            {t?.howItWorks ?? 'How this election works'}{' '}
            <span aria-hidden="true">▾</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleElectionResults;