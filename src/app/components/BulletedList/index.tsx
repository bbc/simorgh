import React, {
  FC,
  PropsWithChildren,
  HTMLAttributes,
  ForwardedRef,
  forwardRef,
} from 'react';
import { SHADOW } from '../ThemeProvider/palette';

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
      className={`mb-4 relative text-grey-2 dark:text-grey-2 ${className || ''}`}
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
    const roundBullets = bulletPointShape === 'round';
    
    // Create bullet styles using CSS custom properties
    const bulletStyles = showBulletPoints ? {
      '--bullet-color': bulletPointColour,
      '--bullet-dark-color': '#6C757D', // GREY_4
    } : {};
    
    const bulletClasses = showBulletPoints
      ? `[&>li]:before:content-[''] [&>li]:before:absolute [&>li]:before:w-3 [&>li]:before:h-3 [&>li]:before:border-[3px] [&>li]:before:top-2 [&>li]:before:-left-4 [&>li]:before:bg-[var(--bullet-color)] [&>li]:before:border-[var(--bullet-color)] [&>li]:dark:before:bg-[var(--bullet-dark-color)] [&>li]:dark:before:border-[var(--bullet-dark-color)] ${roundBullets ? '[&>li]:before:rounded-full' : ''}`
      : '';
    
    return (
      <ul
        className={`mt-0 list-none text-gel-body-copy font-sans-regular ${bulletClasses} ${className || ''}`}
        role="list"
        style={bulletStyles}
        {...(ref && { ref })}
      >
        {children}
      </ul>
    );
  },
);
