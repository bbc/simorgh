/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren } from 'react';
import { SHADOW } from '#app/components/ThemeProvider/palette';
import styles from './index.styles';

type Props = {
  bulletPointShape?: string;
  bulletPointColour?: string;
  className?: string;
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
  bulletPointColour = SHADOW,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <ul
      className={className}
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
          },
        },
      ]}
    >
      {children}
    </ul>
  );
};
