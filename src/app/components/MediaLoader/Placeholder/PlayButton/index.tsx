/** @jsx jsx */
import { jsx } from '@emotion/react';

import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import styles from './index.styles';
import VisuallyHiddenText from '../../../VisuallyHiddenText';

type Props = {
  className?: string;
  datetime?: string;
  duration?: string;
  durationSpoken?: string;
  type?: string;
  title?: string;
  onClick: () => void;
  guidanceMessage?: string | null;
};

const PlayButton = ({
  className = '',
  datetime,
  duration,
  durationSpoken,
  type = 'video',
  title = '',
  onClick,
  guidanceMessage,
}: Props) => {
  const hiddenText = `${guidanceMessage || ''} Play ${type}, ${
    datetime && duration && durationSpoken
      ? `"${title}", ${durationSpoken}`
      : `"${title}"`
  } `.trim();

  const hasDateTimeDuration = datetime && duration && durationSpoken;

  return (
    <button
      type="button"
      css={styles.button}
      onClick={onClick}
      {...(className && { className })}
    >
      <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
      <div
        css={[
          styles.iconWrapper,
          hasDateTimeDuration && styles.iconWrapperWithDate,
        ]}
        aria-hidden="true"
      >
        {mediaIcons?.[type as keyof typeof mediaIcons]}
      </div>
      {datetime && duration && durationSpoken && (
        <time
          css={styles.timeDuration}
          dateTime={datetime}
          aria-hidden="true"
          suppressHydrationWarning
        >
          {duration}
        </time>
      )}
    </button>
  );
};

export default PlayButton;
