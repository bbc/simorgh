/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { MouseEvent, useContext } from 'react';
import { AmpCookieSettingsButton } from '#containers/ConsentBanner/Banner/cookie.amp';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import BrandContainer from '#app/legacy/containers/Brand';
import { FooterLink } from '#app/models/types/serviceConfig';
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

const getElements = ({
  links = [],
  isAmp,
  showAdsBasedOnLocation,
}: {
  links?: FooterLink[];
  isAmp: boolean;
  showAdsBasedOnLocation: boolean;
}) =>
  links?.map(({ id, text, href, lang }) => {
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

export default () => {
  const { isAmp, isApp, showAdsBasedOnLocation } = useContext(RequestContext);
  const { footer, serviceLang } = useContext(ServiceContext);

  if (isApp || !footer) return null;

  const { externalLink, links, copyrightText, trustProjectLink } = footer;

  const elements = getElements({ links, isAmp, showAdsBasedOnLocation });

  return (
    <footer css={styles.footer} role="contentinfo" lang={serviceLang}>
      {/** @ts-expect-error mandatory params not required in footer */}
      <BrandContainer linkId="footer" borderTop />
      <div css={styles.linksWrapper}>
        <div
          css={
            trustProjectLink
              ? styles.constrainedWrapperWithTrustProjectLink
              : styles.constrainedWrapperWithoutTrustProjectLink
          }
        >
          <List elements={elements} trustProjectLink={trustProjectLink} />
          <p css={styles.paragraph}>
            <span lang="en-GB">{`\u00A9`} </span>
            {`${new Date().getFullYear()} ${copyrightText}`}{' '}
            {externalLink && (
              <Link
                text={externalLink?.text}
                href={externalLink?.href}
                inline
              />
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};
