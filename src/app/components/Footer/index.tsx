/** @jsx jsx */
import { jsx } from '@emotion/react';
import { MouseEvent, useContext } from 'react';
import { AmpCookieSettingsButton } from '#containers/ConsentBanner/Banner/cookie.amp';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Link from './Link';
import List from './List';
import styles from './index.styles';

const openPrivacyManagerModal = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  // @ts-expect-error dotcom is required for ads
  if (window.dotcom && window.dotcom.openPrivacyManagerModal) {
    // @ts-expect-error dotcom is required for ads
    window.dotcom.openPrivacyManagerModal();
  }
};

export default () => {
  const { isAmp, showAdsBasedOnLocation } = useContext(RequestContext);
  const { footer } = useContext(ServiceContext);

  const {
    externalLink,
    links,
    copyrightText,
    trustProjectLink,
    collectiveNewsroomText,
  } = footer;

  const elements = links
    ?.map(({ id, text, href, lang }) => {
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
    })
    .filter(Boolean);

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
        {collectiveNewsroomText && (
          <p css={styles.paragraphWithBorderBottom}>{collectiveNewsroomText}</p>
        )}
        <p css={styles.paragraph}>
          <span lang="en-GB">{`\u00A9`} </span>
          {`${new Date().getFullYear()} ${copyrightText}`}{' '}
          {externalLink && (
            <Link text={externalLink?.text} href={externalLink?.href} inline />
          )}
        </p>
      </div>
    </div>
  );
};
