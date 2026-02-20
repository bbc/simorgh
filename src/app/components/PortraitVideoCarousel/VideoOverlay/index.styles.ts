import { css, Theme } from '@emotion/react';

const styles = {
  overlayWrapper: () =>
    css({
      zIndex: 200,
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      containerType: 'inline-size',
      containerName: 'overlayWrapper',
      '@supports not (container-type: inline-size)': {
        display: 'none',
      },
    }),
  overlayFooterContents: ({ spacings }: Theme) =>
    css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: `${spacings.DOUBLE}rem`,
      maxWidth: `77.5rem`,
      margin: 'auto',
      alignItems: 'flex-end',
    }),
  overlayFooter: ({ spacings }: Theme) =>
    css({
      position: 'absolute',
      left: `${spacings.FULL}rem`,
      right: `${spacings.FULL}rem`,
      bottom: 0,
      paddingBottom: '1rem',
      '@supports not (container-type: inline-size)': {
        display: 'none',
      },

      '@container overlayWrapper (min-width: 20rem)': {
        paddingBottom: '5rem',
        left: `${spacings.DOUBLE}rem`,
        right: `${spacings.DOUBLE}rem`,
      },

      // @container (min-width: 500px)
      '@container overlayWrapper (min-width: 31.25rem)': {
        left: `${spacings.TRIPLE}rem`,
        right: `${spacings.TRIPLE}rem`,
      },

      // @container (min-width: 860px)
      '@container overlayWrapper (min-width: 53.75rem)': {
        paddingBottom: '8.75rem',
        left: `${spacings.DOUBLE}rem`,
        right: `${spacings.DOUBLE}rem`,
      },
    }),
  shareToolWrapper: () =>
    css({
      marginLeft: 'auto',
      pointerEvents: 'auto',
    }),
};

export default styles;
