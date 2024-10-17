/** @jsx jsx */
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { ReactElement } from 'react';
import style from './index.styles';
import useScreenGroup, { ScreenGroup } from '../hooks/useScreenGroup';

type PlayButtonProps = {
  className: string;
  datetime?: string;
  duration?: string;
  durationSpoken?: string;
  type?: string;
  title: string;
  onClick?: () => void;
  guidanceMessage?: string | null;
};

const PlayButton = ({
  className = '',
  datetime,
  duration,
  durationSpoken,
  type = 'video',
  title,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  guidanceMessage,
}: PlayButtonProps) => {
  const hiddenText = `${guidanceMessage || ''} Play ${type}, ${
    datetime && duration && durationSpoken
      ? `"${title}", ${durationSpoken}`
      : `"${title}"`
  } `.trim();

  const validDuration = datetime && duration && durationSpoken;

  const screenGroup = useScreenGroup();

  return (
    screenGroup > ScreenGroup.GROUP_1_SMALL && (
      <button
        type="button"
        onClick={onClick}
        css={style.playButton}
        className={className}
      >
        <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
        <div aria-hidden="true" css={style.iconWrapper}>
          {(mediaIcons as Record<string, ReactElement>)[type]}
        </div>
        {validDuration && (
          <time
            css={style.timeDuration}
            dateTime={datetime}
            aria-hidden="true"
            suppressHydrationWarning
          >
            {duration}
          </time>
        )}
      </button>
    )
  );
};

export default PlayButton;
