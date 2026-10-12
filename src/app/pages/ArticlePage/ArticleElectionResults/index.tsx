import { CSSProperties } from 'react';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import {
  ElectionMetric,
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

const formatTime = (epochSeconds?: number | null) =>
  epochSeconds
    ? new Date(epochSeconds * 1000).toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '';

const ElectionResults = ({ results, aboutTags, taggings }: Props) => {
  if (!results) return null;

  // TEMP: local testing only. Revert before committing.
  const hasMatchingTag = Boolean(aboutTags?.length);
  const isEditoriallySensitive = Boolean(taggings?.length && false);
  void hasMatchingTag;
  if (isEditoriallySensitive) return null;

  const {
    title,
    status,
    lastUpdated,
    reporting,
    bannerImage,
    CTA,
    candidates,
  } = results;

  const rows = (candidates ?? []).map(candidate => {
    const vote = candidate.result?.conditions?.find(
      condition => condition?.id === ElectionMetric.VOTE,
    );
    return { candidate, vote, percent: Number(vote?.votesPercentage) || 0 };
  });

  const maxPercent = Math.max(...rows.map(row => row.percent), 1);

  return (
    <section
      className={styles.wrapper}
      data-testid="election-results-wireframe"
    >
      <h2 className={styles.title}>{show(title)}</h2>

      <ul className={styles.candidates}>
        {rows.map(({ candidate, vote, percent }) => (
          <li key={candidate.id} className={styles.candidate}>
            <span className={styles.name}>
              {show(candidate.name)} ({show(candidate.party?.shortName)})
            </span>
            <div
              className={styles.barRow}
              style={
                {
                  '--party-colour': candidate.party?.colour,
                  '--bar-width': (percent / maxPercent) * 100,
                } as CSSProperties
              }
            >
              <div className={styles.bar} />
              <span className={styles.percent}>
                {show(vote?.votesPercentage)}%
              </span>
              {/* TODO: confirm which field "Spread" should show */}
              <span className={styles.spread}>
                Spread {show(reporting?.returned)}/{show(reporting?.total)}
              </span>
            </div>
            {/*<span className={styles.candidateMeta}>
              colour: {show(candidate.party?.colour)}, {show(vote?.totalVotes)}{' '}
              votes, winner: {show(candidate.result?.outcome)}
            </span>*/}
          </li>
        ))}
      </ul>

      <p className={styles.statesCounted}>
        {show(reporting?.returned)} of {show(reporting?.total)} states counted
      </p>

      <div className={styles.actions}>
        {/* TODO: LIVE updates needs its own link field in the data */}
        <a className={`${styles.button} ${styles.live}`} href={CTA?.link}>
          <span className={styles.liveDot} aria-hidden="true" />
          <strong>LIVE</strong>&nbsp;updates
        </a>
        <a className={styles.button} href={CTA?.link}>
          {show(CTA?.text)}
        </a>
        {/* TODO: needs real content/link */}
        <button type="button" className={styles.howItWorks}>
          How this election works <span aria-hidden="true">▾</span>
        </button>
      </div>

      <p className={styles.lastUpdated}>
        Last updated: {show(formatTime(lastUpdated))}
      </p>

      {/* TEMP: raw data kept while the backend is still returning nulls.
          Remove whatever isn't needed once the design is final. */}
      {/* <ul className={styles.dataBlock}>
        <li>status: {show(status)}</li>
        <li>lastUpdated (raw): {show(lastUpdated)}</li>
        <li>bannerImage: {show(bannerImage)}</li>
        <li>
          CTA: {show(CTA?.text)} ({show(CTA?.link)})
        </li>
      </ul> */}
    </section>
  );
};

export default ElectionResults;
