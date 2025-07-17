import React from 'react';

/**
 * MAX_WIDTH        Ensures all embeds assume the same width. (Tweets max-out
 *                  at 500px, which is why this is set to 31.25rem.)
 */
const MAX_WIDTH = '31.25rem';

const getWrapperHeightStyles = oEmbed => {
  /**
   * Adjust MIN_HEIGHT to configure the default minimum height of Social Embed
   * wrappers. This helps reduce layout shift. It is not applied to fallbacks.
   */
  const MIN_HEIGHT = '14rem';

  if (oEmbed?.height && oEmbed?.height !== '100%') {
    return `min-h-[${oEmbed.height / 16}rem]`;
  }

  if (oEmbed) {
    return `min-h-[${MIN_HEIGHT}]`;
  }
  return '';
};

const Wrapper = ({ oEmbed, children, ...props }) => {
  const heightClass = getWrapperHeightStyles(oEmbed);
  
  return (
    <div
      className={`mb-triple max-w-[${MAX_WIDTH}] ${heightClass} no-js:min-h-0`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Wrapper;
