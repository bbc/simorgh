import { css, Theme } from '@emotion/react';
import { CSSProperties } from 'react';

type OEmbedType = {
  height: CSSProperties['height'];
};

export const getWrapperHeightStyles = (oEmbed: OEmbedType) => {
  const MIN_HEIGHT = '14rem';

  if (oEmbed?.height && oEmbed?.height !== '100%') {
    return css({
      minHeight: `${(oEmbed.height as unknown as number) / 16}rem`,
    });
  }

  if (oEmbed) {
    return css({
      minHeight: `${MIN_HEIGHT}`,
    });
  }
  return '';
};

export default {
  wrapper: ({ spacings }: Theme) =>
    css({
      marginBottom: `${spacings.TRIPLE}rem`,
      maxWidth: '31.25rem',
    }),
};
