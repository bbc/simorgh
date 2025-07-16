import {
  FC,
  PropsWithChildren,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from 'react';
import { SHADOW } from '../ThemeProvider/palette';
import styles from './index.module.css';

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
  const itemClassName = [
    styles.bulletListItem,
    className,
  ].filter(Boolean).join(' ');

  return (
    <li
      role="listitem"
      className={itemClassName}
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
    
    const getListClassName = () => {
      const classes = [styles.bulletedList];
      if (showBulletPoints) {
        classes.push(
          bulletPointShape === 'round' 
            ? styles.bulletedListRound 
            : styles.bulletedListSquare
        );
      }
      if (className) classes.push(className);
      return classes.join(' ');
    };

    const listStyle = {
      '--bullet-color': bulletPointColour,
    } as React.CSSProperties;

    return (
      <ul
        className={getListClassName()}
        role="list"
        style={listStyle}
        {...(ref && { ref })}
      >
        {children}
      </ul>
    );
  },
);
