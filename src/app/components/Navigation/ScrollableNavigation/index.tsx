import { PropsWithChildren } from 'react';
import { Direction } from '#app/models/types/global';
import styles from './index.styles';

type Props = {
  dir?: Direction;
  navPosition?: 'primary' | 'secondary';
  id?: string;
  className?: string;
};

const ScrollableNavigation = ({
  children,
  dir = 'ltr',
  navPosition,
  id,
  className,
}: PropsWithChildren<Props>) => (
  <div
    css={[
      styles.scrollableNav,
      navPosition === 'primary' && styles.primary,
      navPosition === 'secondary' && styles.secondary,
    ]}
    data-e2e={`scrollable-nav${navPosition === 'secondary' ? '-secondary' : ''}`}
    dir={dir}
    id={id}
    className={className}
  >
    {children}
  </div>
);

export default ScrollableNavigation;
