import { use } from 'react';
import { RequestContext } from '#contexts/RequestContext';
import AccountHeader from '#app/components/Account/AccountHeader';
import { ExternalSvg } from '#app/components/icons';
import styles from './index.styles';

export const GLOBAL_LANGUAGES_PATH = '/ws/languages';

export const isGlobalLanguageHomepage = (inputPathname?: string) => {
  if (!inputPathname) return false;

  const pathname = inputPathname?.split(/[?#]/)?.[0]?.replace(/\/$/, '');
  return pathname === GLOBAL_LANGUAGES_PATH;
};

const NewLogoBanner = () => {
  const { pathname } = use(RequestContext);

  const logoHref = isGlobalLanguageHomepage(pathname)
    ? '/'
    : GLOBAL_LANGUAGES_PATH;

  return (
    <div css={styles.banner} data-testid="logo-banner">
      <a href={logoHref} aria-label="BBC News World Service">
        <ExternalSvg
          path="images/icons/ws-header-logo.svg"
          width="112"
          isColoured
        />
      </a>
      <AccountHeader variant="default" />
    </div>
  );
};

export default NewLogoBanner;
