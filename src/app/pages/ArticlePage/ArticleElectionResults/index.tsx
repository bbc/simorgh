import { CSSProperties } from 'react';
import {
  ElectionMetric,
  ElectionResults as ElectionResultsData,
} from '#app/models/types/elections';
import styles from './index.module.scss';

type Props = {
  results: ElectionResultsData;
};

const show = (value: unknown) =>
  value === null || value === undefined || value === ''
    ? 'null'
    : String(value);

const ElectionResults = ({ results }: Props) => {
  if (!results) return null;

  const {
    title,
    status,
    lastUpdated,
    reporting,
    bannerImage,
    CTA,
    candidates,
  } = results;

  return (
    <section
      className={styles.wireframe}
      data-testid="election-results-wireframe"
    >
      <h2 className={styles.title}>{show(title)}</h2>
      <ul className={styles.list}>
        <li>status: {show(status)}</li>
        <li>lastUpdated: {show(lastUpdated)}</li>
        <li>
          reporting: {show(reporting?.returned)} of {show(reporting?.total)}
        </li>
        <li>bannerImage: {show(bannerImage)}</li>
        <li>
          CTA: {show(CTA?.text)} ({show(CTA?.link)})
        </li>
      </ul>
      <ul className={styles.list}>
        {candidates?.map(candidate => {
          const vote = candidate.result?.conditions?.find(
            condition => condition?.id === ElectionMetric.VOTE,
          );

          return (
            <li
              key={candidate.id}
              className={styles.candidate}
              style={
                {
                  '--party-colour': candidate.party?.colour,
                } as CSSProperties
              }
            >
              {show(candidate.name)} ({show(candidate.party?.shortName)},{' '}
              {show(candidate.party?.colour)}): {show(vote?.votesPercentage)}%,{' '}
              {show(vote?.totalVotes)} votes, winner:{' '}
              {show(candidate.result?.outcome)}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ElectionResults;
