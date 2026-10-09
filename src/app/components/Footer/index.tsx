import { MouseEvent, use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import Link from './Link';
import List from './List';
import styles from './index.styles';

const openPrivacyManagerModal = (e: MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault();
  // @ts-expect-error dotcom is required for ads
  if (window.dotcom?.openPrivacyManagerModal) {
    // @ts-expect-error dotcom is required for ads
    window.dotcom.openPrivacyManagerModal();
  }
};

export default () => {
  const { showAdsBasedOnLocation } = use(RequestContext);
  const { footer } = use(ServiceContext);

  const {
    externalLink,
    links,
    extraLinks,
    copyrightText,
    trustProjectLink,
    collectiveNewsroomText,
  } = footer;

  const extraLinkElements =
    Array.isArray(extraLinks) && extraLinks.length > 0
      ? extraLinks.map(({ id, text, href, lang }) => (
          <Link key={id || href} text={text} href={href} lang={lang} />
        ))
      : [];

  const elements = links
    ?.map(({ id, text, href, lang }) => {
      if (id === 'COOKIE_SETTINGS') {
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
        {extraLinkElements.length > 0 && (
          <List elements={extraLinkElements} extraLinks />
        )}
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
