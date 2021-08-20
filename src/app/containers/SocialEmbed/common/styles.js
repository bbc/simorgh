import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

/**
 * MAX_WIDTH        Ensures all embeds assume the same width. (Tweets max-out
 *                  at 500px, which is why this is set to 31.25rem.)
 * LAZYLOAD_OFFSET  The distance in pixels above or below the viewport before
 *                  an embed is allowed to load.
 */
const MAX_WIDTH = '31.25rem';
export const LAZYLOAD_OFFSET = 250;
const MIN_WRAPPER_HEIGHT = '18.75rem';

const getWrapperHeightStyles = (oEmbed, minHeight) => {
  /**
   * Adjust MIN_HEIGHT to configure the default minimum height of Social Embed
   * wrappers. This helps reduce layout shift. It is not applied to fallbacks.
   */
  if (minHeight) return `min-height: ${minHeight}`;
  if (oEmbed?.height) return `min-height: ${oEmbed.height / 16}rem`;
  return '';
};

export const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${MAX_WIDTH};
  ${({ oEmbed, minHeight = MIN_WRAPPER_HEIGHT }) =>
    getWrapperHeightStyles(oEmbed, minHeight)}
`;
