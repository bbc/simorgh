import type { ReactNode } from 'react';
import styles from './index.module.scss';

// Matches timecodes like 00:00, 1:23, 01:23:45 at the start of a line
const TIMECODE_PATTERN = /^\d{1,2}:\d{2}(:\d{2})?/;

// Used as a capturing group in split() so URLs are preserved in the resulting array
const URL_SPLIT_PATTERN = /(https?:\/\/[^\s<>"{}|\\^[\]`]+)/g;
const URL_TEST_PATTERN = /^https?:\/\//;

const isChapterBlock = (lines: string[]) => {
  const nonEmptyLines = lines.filter(line => line.trim() !== '');
  return (
    nonEmptyLines.length > 0 &&
    nonEmptyLines.every(line => TIMECODE_PATTERN.test(line.trim()))
  );
};

const timecodeToSeconds = (timecode: string): number => {
  const parts = timecode.split(':').map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return parts[0] * 60 + parts[1];
};

const renderWithLinks = (text: string): ReactNode[] =>
  text.split(URL_SPLIT_PATTERN).map((part, i) => {
    if (URL_TEST_PATTERN.test(part)) {
      return (
        <a
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          {part}
        </a>
      );
    }
    return part || null;
  });

type ChapterListProps = {
  lines: string[];
  playerId?: string;
};

const ChapterList = ({ lines, playerId }: ChapterListProps) => {
  const handleSeek = (timecode: string) => {
    if (!playerId) return;
    const player = window.mediaPlayers?.[playerId];
    if (!player) return;
    player.currentTime = timecodeToSeconds(timecode);
    player.play();
  };

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
                <button
                  type="button"
                  className={`${styles.timestamp} ${styles.timestampButton}`}
                  onClick={() => handleSeek(timestamp)}
                >
                  <time>{timestamp}</time>
                </button>
              ) : (
                <time className={styles.timestamp}>{timestamp}</time>
              )}
              {label && (
                <span className={styles.chapterLabel}>
                  {renderWithLinks(label)}
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
}

const PlainTextFormatter = ({
  text,
  'data-testid': testId,
  playerId,
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
              <ChapterList lines={lines} playerId={playerId} />
            </div>
          );
        }
        return (
          // eslint-disable-next-line react/no-array-index-key
          <p key={i} className={styles.paragraph}>
            {renderWithLinks(block.replace(/\n/g, ' '))}
          </p>
        );
      })}
    </div>
  );
};

export default PlainTextFormatter;
