import React, { use, useRef, useState } from 'react';
import { css } from '@emotion/react';
import SkipLink from '#psammead/psammead-brand/src/SkipLink';
import { RequestContext } from '#contexts/RequestContext';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import ScriptLink from '#app/components/Header/ScriptLink';
import {
  ARTICLE_PAGE,
  HOME_PAGE,
  TOPIC_PAGE,
  ERROR_PAGE,
} from '#app/routes/utils/pageTypes';
import LiteSiteSummary from '#app/components/LiteSiteSummary';
import WideBanner from '#app/components/LiteStatusBanner';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ConsentBanner from '../ConsentBanner';
import NavigationContainer from '../Navigation';
import BrandContainer from '../Brand';

const Header = ({ brandRef, borderBottom, skipLink, scriptLink, linkId }) => {
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
      />
    </div>
  );
};

const HeaderContainer = ({ propsForOJExperiment }) => {
  const { isAmp, isApp, pageType, isLite } = use(RequestContext);
  const { service, script, translations, dir, scriptLink, lang, serviceLang } =
    use(ServiceContext);
  const { skipLinkText } = translations;

  const isOperaMini = useOperaMiniDetection();

  const brandRef = useRef(null);

  // `serviceLang` is defined when the language the page is written in is different to the
  // language of the service. `serviceLang` is used to override the page language.
  // However, the skip to content link remains set in the page language.
  const skipLink = !isOperaMini && (
    <SkipLink
      service={service}
      script={script}
      dir={dir}
      href="#content"
      lang={serviceLang && lang}
    >
      <div>{skipLinkText}</div>
    </SkipLink>
  );

  let shouldRenderScriptSwitch = false;

  if (scriptLink) {
    switch (true) {
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

  return (
    <>
      <header role="banner" lang={serviceLang} css={{ zIndex: 2 }}>
        {isAmp ? (
          <Header
            linkId="brandLink"
            skipLink={skipLink}
            scriptLink={shouldRenderScriptSwitch && <ScriptLink />}
          />
        ) : (
          <Header
            brandRef={brandRef}
            skipLink={skipLink}
            scriptLink={shouldRenderScriptSwitch && <ScriptLink />}
          />
        )}
        {/* {isLite && <LiteSiteSummary />} */}
        <NavigationContainer propsForOJExperiment={propsForOJExperiment} />
      </header>
      <WideBanner
        heading="Feeling slow?"
        description="Built for 2G, BBC Turbo harnesses the power of lite technology to deliver the essentials you need – hyper fast, at data-friendly rates."
        link="http://localhost:7080/gahuza.lite"
        linkText="Turbo"
        image="https://ichef.bbci.co.uk/ace/standard/raw/cpsprodpb/e329/live/0a700dd0-7cb3-11ee-a503-4588075e3427.png"
      />
    </>
  );
};

export default HeaderContainer;
