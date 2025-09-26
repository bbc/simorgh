/** @jsx jsx */
import { jsx } from '@emotion/react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import { ReactElement } from 'react';
import style from './index.styles';

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
  type = 'Video',
  title = '',
}: MediaIndicatorProps) => {
  const hiddenText = `${type}, ${
    datetime && duration && durationSpoken
      ? `"${title}", ${durationSpoken}`
      : `"${title}"`
  } `.trim();

  const hasDuration = datetime && duration && durationSpoken;

  return (
    <div css={style.mediaIcon}>
      <p>
        <VisuallyHiddenText as="strong">{hiddenText}</VisuallyHiddenText>
      </p>
      <div aria-hidden="true" css={[style.iconWrapper, style.item]}>
        {(mediaIcons as Record<string, ReactElement>)[type]}
      </div>
      {hasDuration && (
        <time
          css={[style.timeDuration, style.item]}
          dateTime={datetime}
          aria-hidden="true"
          suppressHydrationWarning
        >
          {duration}
        </time>
      )}
    </div>
  );
};

export default MediaIndicator;
