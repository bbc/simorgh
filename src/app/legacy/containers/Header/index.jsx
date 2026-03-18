import { use, useRef, useState } from 'react';
import SkipLink from '#psammead/psammead-brand/src/SkipLink';
import { RequestContext } from '#contexts/RequestContext';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import ScriptLink from '#app/components/Header/ScriptLink';
import {
  ARTICLE_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
  ERROR_PAGE,
  LIVE_PAGE,
} from '#app/routes/utils/pageTypes';
import LiteSiteSummary from '#app/components/LiteSiteSummary';
import NewNavigationContainer from '#src/app/components/Navigation';
import LegacyNavigationContainer from '#src/app/legacy/containers/Navigation';
import AccountHeader from '#app/components/Account/AccountHeader';
import isLive from '#lib/utilities/isLive';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ConsentBanner from '../ConsentBanner';
import BrandContainer from '../Brand';
import NewLogoBanner from './NewLogoBanner';
import styles from './index.styles';

const Header = ({
  brandRef,
  borderBottom,
  skipLink,
  scriptLink,
  linkId,
  children,
  className,
}) => {
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  const handleBannerBlur = event => {
    const isRejectButton =
      event.target?.getAttribute('data-terms-banner') === 'reject' ||
      event.target?.getAttribute('data-cookie-banner') === 'reject';
    const isAcceptButton =
      event.relatedTarget?.getAttribute('data-terms-banner') === 'accept' ||
      event.relatedTarget?.getAttribute('data-cookie-banner') === 'accept';
    const hasMovedToContent = !isAcceptButton && event.relatedTarget !== 'null';

    if (isRejectButton && hasMovedToContent) {
      setShowConsentBanner(null);
    }
  };

  // linkId={linkId || 'topPage'} is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  return (
    <div onBlur={handleBannerBlur}>
      {showConsentBanner && <ConsentBanner onDismissFocusRef={brandRef} />}
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLink}
        brandRef={brandRef}
        linkId={linkId || 'topPage'}
        className={className}
      >
        {children}
      </BrandContainer>
    </div>
  );
};

const HeaderContainer = ({ navItems, propsForTopBarOJComponent }) => {
  const { isAmp, isApp, pageType, isLite } = use(RequestContext);
  const { service, translations, dir, scriptLink, lang, serviceLang } =
    use(ServiceContext);
  const { skipLinkText } = translations;

  const isOperaMini = useOperaMiniDetection();

  const brandRef = useRef(null);

  // `serviceLang` is defined when the language the page is written in is different to the
  // language of the service. `serviceLang` is used to override the page language.
  // However, the skip to content link remains set in the page language.
  const skipLink = !isOperaMini && (
    <SkipLink
      dir={dir || 'ltr'}
      href="#content"
      lang={serviceLang && lang}
      className="focusIndicatorRemove"
    >
      <div>{skipLinkText}</div>
    </SkipLink>
  );

  let shouldRenderScriptSwitch = false;

  if (scriptLink) {
    switch (true) {
      case pageType === LIVE_PAGE:
      case service === 'uzbek' &&
        ![ARTICLE_PAGE, HOME_PAGE, TOPIC_PAGE, ERROR_PAGE].includes(pageType):
        shouldRenderScriptSwitch = false;
        break;
      default:
        shouldRenderScriptSwitch = true;
        break;
    }
  }

  if (isApp) return null;

  const shouldUseNewNav = SERVICES_WITH_NEW_NAV.includes(service) && !isLive();

  const NavigationComponent = shouldUseNewNav
    ? NewNavigationContainer
    : LegacyNavigationContainer;

  return (
    <header role="banner" lang={serviceLang}>
      {shouldUseNewNav && <NewLogoBanner />}
      {isAmp ? (
        <Header
          linkId="brandLink"
          skipLink={skipLink}
          scriptLink={shouldRenderScriptSwitch && <ScriptLink />}
          css={shouldUseNewNav ? styles.headerBrand : null}
        >
          <AccountHeader />
        </Header>
      ) : (
        <Header
          brandRef={brandRef}
          skipLink={skipLink}
          scriptLink={shouldRenderScriptSwitch && <ScriptLink />}
          css={shouldUseNewNav ? styles.headerBrand : null}
        >
          <AccountHeader />
        </Header>
      )}
      {isLite && <LiteSiteSummary />}
      <NavigationComponent
        navItems={navItems}
        propsForTopBarOJComponent={propsForTopBarOJComponent}
      />
    </header>
  );
};

export default HeaderContainer;
