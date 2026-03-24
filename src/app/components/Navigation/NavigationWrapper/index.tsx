import { PropsWithChildren } from 'react';
import styles from './index.styles';

type Props = {
  dir?: 'ltr' | 'rtl';
  isOpen?: boolean;
  ampOpenClass?: string;
  id?: string;
};

const NavigationWrapper = ({
  children,
  dir = 'ltr',
  isOpen = false,
  ampOpenClass,
  id,
}: PropsWithChildren<Props>) => (
  <nav
    role="navigation"
    dir={dir}
    id={id}
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
