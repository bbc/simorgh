/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
// import { SHADOW } from '#app/components/ThemeProvider/palette';
import styles from './index.styles';

type Props = {
  bulletPointShape?: string;
  bulletPointColour?: string;
};

export const BulletedListItem = ({ children }: PropsWithChildren) => {
  return (
    <li role="listitem" css={styles.bulletListItem}>
      {children}
    </li>
  );
};

export const BulletedList = ({
  bulletPointShape = 'round',
  //   bulletPointColour = SHADOW,
  bulletPointColour = '#3F3F42',
  children,
}: PropsWithChildren<Props>) => {
  return (
    <ul
      role="list"
      css={theme => [
        styles.bulletedList,
        {
          '& > li::before': {
            border: `0.1875rem solid ${theme.isDarkUi ? theme.palette.GREY_4 : bulletPointColour}`,
            backgroundColor: theme.isDarkUi
              ? theme.palette.GREY_4
              : bulletPointColour,
            borderRadius: bulletPointShape === 'round' ? '50%' : '0',
            insetInlineStart: '-1rem',
          },
        },
      ]}
    >
      {children}
    </ul>
  );
};
