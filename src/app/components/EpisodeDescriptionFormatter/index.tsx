import type { MouseEvent, ReactNode } from 'react';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingData } from '#app/lib/analyticsUtils/types';
import styles from './index.module.scss';

const CHAPTER_TIMESTAMP_TRACKER_TYPE = 'podcast-chapter-timestamp';
const LINK_TRACKER_TYPE = 'podcast-description-link';

// Matches timecodes like 00:00, 1:23, 01:23:45 at the start of a line
const TIMECODE_PATTERN = /^\d{1,2}:\d{2}(:\d{2})?/;

// Splits a string at whitespace that is immediately followed by a timecode —
// used to detect and extract timecodes embedded inline within a paragraph.
// The lookahead ensures the captured token itself starts the next chunk.
const INLINE_TIMECODE_SPLIT = /\s(?=\d{1,2}:\d{2}(?::\d{2})?\s)/;

// Used as a capturing group in split() so URLs are preserved in the resulting array
// Matches both full URLs (https?://) and bare domains (example.com, www.example.com, youtube.com)
const URL_SPLIT_PATTERN =
  /(https?:\/\/[^\s<>"{}|\\^[\]`]+|(?:www\.)?[a-z0-9][-a-z0-9]*(?:\.[a-z0-9][-a-z0-9]*)+(?:[/?#][^\s<>"{}|\\^[\]`]*)?)/gi;
const URL_TEST_PATTERN = /^https?:\/\//i;

const isChapterBlock = (lines: string[]) => {
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return (
    nonEmptyLines.length > 0 &&
    nonEmptyLines.every(line => TIMECODE_PATTERN.test(line.trim()))
  );
};

// Handles synopses where timecodes are embedded inline in a paragraph rather
// than on separate lines, e.g. "Intro text. 00:00 Chapter 00:34 Next chapter".
// Requires at least 2 timecode entries to avoid false-positives on standalone
// time references like "the 1:30 interview".
const parseInlineTimecodes = (
  block: string,
): { intro: string; chapterLines: string[] } | null => {
  const parts = block.split(INLINE_TIMECODE_SPLIT);
  if (parts.length < 3) return null;
  if (!TIMECODE_PATTERN.test(parts[1].trim())) return null;
  return { intro: parts[0].trim(), chapterLines: parts.slice(1) };
};

const timecodeToSeconds = (timecode: string): number => {
  const parts = timecode.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
};

type TrackedLinkProps = {
  href: string;
  text: string;
  eventTrackingData?: EventTrackingData;
};

const TrackedLink = ({ href, text, eventTrackingData }: TrackedLinkProps) => {
  const itemEventTrackingData = {
    ...eventTrackingData,
    itemTracker: {
      ...eventTrackingData?.itemTracker,
      type: LINK_TRACKER_TYPE,
      text: href,
    },
  };

  const { onClick: clickTrackerHandler } = useClickTrackerHandler(
    itemEventTrackingData,
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    clickTrackerHandler?.(event);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.link}
      onClick={handleClick}
    >
      {text}
    </a>
  );
};

const renderWithLinks = (
  text: string,
  eventTrackingData?: EventTrackingData,
): ReactNode[] =>
  text.split(URL_SPLIT_PATTERN).map((part, i) => {
    // split() with capturing group: odd indices are matched URLs, even are text
    const isUrl = i % 2 === 1;
    if (!isUrl || !part) return part || null;

    // Prepend https:// to bare domains that don't have a protocol
    const href = URL_TEST_PATTERN.test(part) ? part : `https://${part}`;

    if (eventTrackingData) {
      return (
        <TrackedLink
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          href={href}
          text={part}
          eventTrackingData={eventTrackingData}
        />
      );
    }
    return (
      <a
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        {part}
      </a>
    );
  });

type ChapterListProps = {
  lines: string[];
  playerId?: string;
  eventTrackingData?: EventTrackingData;
};

type ChapterTimestampButtonProps = {
  timecode: string;
  playerId: string;
  position: number;
  eventTrackingData?: EventTrackingData;
};

const ChapterTimestampButton = ({
  timecode,
  playerId,
  position,
  eventTrackingData,
}: ChapterTimestampButtonProps) => {
  const itemEventTrackingData = {
    ...eventTrackingData,
    itemTracker: {
      ...eventTrackingData?.itemTracker,
      type: CHAPTER_TIMESTAMP_TRACKER_TYPE,
      text: timecode,
      position: position + 1,
    },
  };

  const { onClick: clickTrackerHandler } = useClickTrackerHandler(
    itemEventTrackingData,
  );

  const handleSeek = (event: MouseEvent<HTMLButtonElement>) => {
    clickTrackerHandler?.(event);

    const player = window.mediaPlayers?.[playerId];
    if (!player) return;
    player.currentTime(timecodeToSeconds(timecode));
    player.play();
  };

  return (
    <button
      type="button"
      className={`${styles.timestamp} ${styles.timestampButton}`}
      onClick={handleSeek}
    >
      <time>{timecode}</time>
    </button>
  );
};

const ChapterList = ({
  lines,
  playerId,
  eventTrackingData,
}: ChapterListProps) => {
  return (
    <ol className={styles.chapterList}>
      {lines
        .filter(line => line.trim() !== '')
        .map((line, i) => {
          const spaceIndex = line.indexOf(' ');
          const timestamp =
            spaceIndex > -1 ? line.slice(0, spaceIndex) : line.trim();
          const label =
            spaceIndex > -1 ? line.slice(spaceIndex + 1).trim() : '';
          const isInteractive = Boolean(playerId);
          return (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i} className={styles.chapterItem}>
              {isInteractive ? (
                <ChapterTimestampButton
                  timecode={timestamp}
                  playerId={playerId as string}
                  position={i}
                  eventTrackingData={eventTrackingData}
                />
              ) : (
                <time className={styles.timestamp}>{timestamp}</time>
              )}
              {label && (
                <span className={styles.chapterLabel}>
                  {renderWithLinks(label, eventTrackingData)}
                </span>
              )}
            </li>
          );
        })}
    </ol>
  );
};

interface Props {
  text: string;
  'data-testid'?: string;
  playerId?: string;
  eventTrackingData?: EventTrackingData;
}

const EpisodeDescriptionFormatter = ({
  text,
  'data-testid': testId,
  playerId,
  eventTrackingData,
}: Props) => {
  if (!text) return null;

  const blocks = text
    .split(/\n[ \t]*\n/)
    .map(block => block.trim())
    .filter(Boolean);

  return (
    <div data-testid={testId}>
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (isChapterBlock(lines)) {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className={styles.chapterBlock}>
              <ChapterList
                lines={lines}
                playerId={playerId}
                eventTrackingData={eventTrackingData}
              />
            </div>
          );
        }
        const inlineTimecodes = parseInlineTimecodes(block);
        if (inlineTimecodes) {
          const { intro, chapterLines } = inlineTimecodes;
          return (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i}>
              {intro && (
                <p className={styles.paragraph}>
                  {renderWithLinks(intro, eventTrackingData)}
                </p>
              )}
              <div className={styles.chapterBlock}>
                <ChapterList
                  lines={chapterLines}
                  playerId={playerId}
                  eventTrackingData={eventTrackingData}
                />
              </div>
            </div>
          );
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className={styles.paragraph}>
            {renderWithLinks(block.replace(/\n/g, ' '), eventTrackingData)}
          </p>
        );
      })}
    </div>
  );
};

export default EpisodeDescriptionFormatter;
