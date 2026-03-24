import { PropsWithChildren } from 'react';
import styles from './index.styles';

type Props = {
  dir?: 'ltr' | 'rtl';
  isOpen?: boolean;
  ampOpenClass?: string;
  id?: string;
  className?: string;
};

const NavigationWrapper = ({
  children,
  dir = 'ltr',
  isOpen = false,
  ampOpenClass,
  id,
  className,
}: PropsWithChildren<Props>) => (
  <nav
    role="navigation"
    dir={dir}
    id={id}
    className={className}
    css={[
      styles.nav,
      isOpen && styles.navOpen,
      ampOpenClass && styles.withAmpOpenClass(ampOpenClass),
    ]}
  >
    <div css={styles.navWrapper}>{children}</div>
  </nav>
);

export default NavigationWrapper;
