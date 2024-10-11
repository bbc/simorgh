/** @jsx jsx */
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { ReactElement } from 'react';
import style from './index.styles';
import useScreenGroup, { ScreenGroup } from '../hooks/useScreenGroup';

type MediaIndicatorProps = {
  datetime?: string;
  duration?: string;
  durationSpoken?: string;
  type?: string;
  title?: string;
  guidanceMessage?: string | null;
};

const MediaIndicator = ({
  datetime,
  duration,
  durationSpoken,
  type = 'video',
  title = '',
  guidanceMessage,
}: MediaIndicatorProps) => {
  const hiddenText = `${guidanceMessage || ''} Play ${type}, ${
    datetime && duration && durationSpoken
      ? `"${title}", ${durationSpoken}`
      : `"${title}"`
  } `.trim();

  const validDuration = datetime && duration && durationSpoken;

  const screenGroup = useScreenGroup();

  return (
    screenGroup > ScreenGroup.GROUP_1_SMALL && (
      <div css={style.mediaIcon}>
        <VisuallyHiddenText>{hiddenText}</VisuallyHiddenText>
        <div aria-hidden="true" css={[style.iconWrapper, style.flexItem]}>
          {(mediaIcons as Record<string, ReactElement>)[type]}
        </div>
        {validDuration && (
          <time
            css={[style.timeDuration, style.flexItem]}
            dateTime={datetime}
            aria-hidden="true"
            suppressHydrationWarning
          >
            {duration}
          </time>
        )}
      </div>
    )
  );
};

export default MediaIndicator;
