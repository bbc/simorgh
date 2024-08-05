/** @jsx jsx */
import { jsx } from '@emotion/react';
import {
  FC,
  PropsWithChildren,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from 'react';
import { SHADOW } from '../ThemeProvider/palette';
import styles from './index.styles';

interface ListItemProps {
  className?: string;
  key?: string;
}
interface ListProps extends HTMLAttributes<HTMLUListElement> {
  bulletPointShape?: string;
  bulletPointColour?: string;
  className?: string;
}

export const BulletedListItem = ({
  children,
  className,
  key,
}: PropsWithChildren<ListItemProps>) => {
  return (
    <li
      role="listitem"
      className={className}
      css={styles.bulletListItem}
      key={key}
    >
      {children}
    </li>
  );
};

export const BulletedList: FC<ListProps> = forwardRef(
  (
    {
      bulletPointShape = 'round',
      bulletPointColour = SHADOW,
      className,
      children,
    }: PropsWithChildren<ListProps>,
    ref: ForwardedRef<HTMLUListElement>,
  ) => {
    const showBulletPoints = bulletPointShape !== 'hidden';
    return (
      <ul
        className={className}
        role="list"
        css={theme => [
          styles.bulletedList,
          showBulletPoints && {
            '& > li::before': {
              border: `0.1875rem solid ${theme.isDarkUi ? theme.palette.GREY_4 : bulletPointColour}`,
              backgroundColor: theme.isDarkUi
                ? theme.palette.GREY_4
                : bulletPointColour,
              borderRadius: bulletPointShape === 'round' ? '50%' : '0',
            },
          },
        ]}
        {...(ref && { ref })}
      >
        {children}
      </ul>
    );
  },
);
