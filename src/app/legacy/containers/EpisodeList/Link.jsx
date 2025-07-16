/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import MediaIndicator from './MediaIndicator';
import { withEpisodeContext } from './helpers';

const Link = ({
  children,
  showMediaIndicator = false,
  dir,
  index,
  ...props
}) => {
  return (
    <a
      showMediaIndicator={showMediaIndicator}
      // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      aria-labelledby={`episodeLinkIndex-${index}`}
      className="focusIndicatorDisplayBlock focusIndicatorInvert block before:absolute before:inset-0 before:content-[''] before:overflow-hidden before:z-[1] leading-none no-underline [&_.rounded-play-button__ring]:text-black [&_.rounded-play-button__triangle]:text-black focus:[&_[class*='--hover']]:underline hover:[&_[class*='--hover']]:underline focus:[&_.rounded-play-button__ring]:fill-current hover:[&_.rounded-play-button__ring]:fill-current focus:[&_.rounded-play-button__ring]:text-postbox hover:[&_.rounded-play-button__ring]:text-postbox focus:[&_.rounded-play-button__inner]:fill-current hover:[&_.rounded-play-button__inner]:fill-current focus:[&_.rounded-play-button__inner]:text-postbox hover:[&_.rounded-play-button__inner]:text-postbox focus:[&_.rounded-play-button__triangle]:fill-transparent hover:[&_.rounded-play-button__triangle]:fill-transparent visited:[&_[class*='--visited']]:text-stone visited:dark:[&_[class*='--visited']]:text-metal"
      {...props}
    >
      {showMediaIndicator && (
        <div
          className={`absolute ${dir === 'ltr' ? 'left-2' : 'right-2'} top-0`}
          aria-hidden="true"
        >
          <MediaIndicator size="2.5rem" />
        </div>
      )}
      <span
        role="text"
        id={`episodeLinkIndex-${index}`} // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
      >
        {children}
      </span>
    </a>
  );
};

export default withEpisodeContext(Link);
