/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { MouseEvent} from 'react';
import { AmpCookieSettingsButton } from '#containers/ConsentBanner/Banner/cookie.amp';
import { Footer } from '#app/models/types/serviceConfig';
import Link from './Link';
import List from './List';
import styles from './index.styles';

interface FooterProps extends Footer {
  isAmp?: boolean;
  showAdsBasedOnLocation?: boolean;
  service?: string;
}

const openPrivacyManagerModal = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  // @ts-expect-error dotcom is required for ads
  if (window.dotcom && window.dotcom.openPrivacyManagerModal) {
    // @ts-expect-error dotcom is required for ads
    window.dotcom.openPrivacyManagerModal();
  }
};

export default ({
  links,
  trustProjectLink,
  copyrightText,
  collectiveNewsroomText,
  externalLink,
  isAmp,
  showAdsBasedOnLocation,
}: FooterProps) => {
  const elements = links?.map(({ id, text, href, lang }) => {
    if (id === 'COOKIE_SETTINGS') {
      if (isAmp) {
        return (
          // @ts-expect-error we do not have a className
          <AmpCookieSettingsButton
            lang={lang}
            css={styles.ampCookieSettingButton}
          >
            {text}
          </AmpCookieSettingsButton>
        );
      }

      if (showAdsBasedOnLocation) {
        return (
          <Link
            text={text}
            href={href}
            lang={lang}
            onClick={openPrivacyManagerModal}
            onlyShowIfJSenabled
          />
        );
      }
    } else {
      return <Link text={text} href={href} lang={lang} />;
    }
    return null;
  });

  return (
    <div css={styles.siteWideLinksWrapper}>
      <div
        css={
          trustProjectLink
            ? styles.constrainedWrapperWithTrustProjectLink
            : styles.constrainedWrapperWithoutTrustProjectLink
        }
      >
        <List elements={elements} trustProjectLink={trustProjectLink} />
        { collectiveNewsroomText && <p css={styles.paragraphWithBorderBottom}>
          {collectiveNewsroomText}
        </p>}
        <p css={styles.paragraph}>
          {copyrightText}{' '}
          {externalLink && (
            <Link text={externalLink?.text} href={externalLink?.href} inline />
          )}
        </p>
      </div>
    </div>
  );
};
