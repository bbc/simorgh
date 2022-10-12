import styled from '@emotion/styled';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';

/**
 * MAX_WIDTH        Ensures all embeds assume the same width. (Tweets max-out
 *                  at 500px, which is why this is set to 31.25rem.)
 * LAZYLOAD_OFFSET  The distance in pixels above or below the viewport before
 *                  an embed is allowed to load.
 */
const MAX_WIDTH = '31.25rem';
export const LAZYLOAD_OFFSET = 250;

const getWrapperHeightStyles = oEmbed => {
  /**
   * Adjust MIN_HEIGHT to configure the default minimum height of Social Embed
   * wrappers. This helps reduce layout shift. It is not applied to fallbacks.
   */
  const MIN_HEIGHT = '14rem';

  if (oEmbed?.height && oEmbed?.height !== '100%') {
    return `min-height: ${oEmbed.height / 16}rem`;
  }

  if (oEmbed) {
    return `min-height: ${MIN_HEIGHT};`;
  }
  return '';
};

export const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${MAX_WIDTH};
  ${({ oEmbed }) => getWrapperHeightStyles(oEmbed)}
`;
