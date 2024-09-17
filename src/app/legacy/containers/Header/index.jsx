import React, { useContext, useRef, useState } from 'react';
import SkipLink from '#psammead/psammead-brand/src/SkipLink';
import { RequestContext } from '#contexts/RequestContext';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import ScriptLink from '#app/components/Header/ScriptLink';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { ServiceContext } from '#contexts/ServiceContext';
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

const HeaderContainer = ({
  scriptSwitchId = '',
  renderScriptSwitch = true,
}) => {
  const { isAmp, isApp, pageType } = useContext(RequestContext);
  const { service, script, translations, dir, scriptLink, lang, serviceLang } =
    useContext(ServiceContext);
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

  if (scriptLink && renderScriptSwitch) {
    if (service === 'uzbek' && pageType !== ARTICLE_PAGE) {
      shouldRenderScriptSwitch = false;
    } else {
      shouldRenderScriptSwitch = true;
    }
  }

  if (isApp) return null;

  return (
    <header role="banner" lang={serviceLang}>
      {isAmp ? (
        <Header
          linkId="brandLink"
          skipLink={skipLink}
          scriptLink={
            shouldRenderScriptSwitch && (
              <ScriptLink scriptSwitchId={scriptSwitchId} />
            )
          }
        />
      ) : (
        <Header
          brandRef={brandRef}
          skipLink={skipLink}
          scriptLink={
            shouldRenderScriptSwitch && (
              <ScriptLink scriptSwitchId={scriptSwitchId} />
            )
          }
        />
      )}
      <NavigationContainer />
    </header>
  );
};

export default HeaderContainer;
