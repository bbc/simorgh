import React, { useContext, useRef, useState } from 'react';
import SkipLink from '#psammead/psammead-brand/src/SkipLink';
import { RequestContext } from '#contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { string, bool } from 'prop-types';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import ScriptLink from './ScriptLink';
import ConsentBanner from '../ConsentBanner';
import NavigationContainer from '../Navigation';
import BrandContainer from '../Brand';

// eslint-disable-next-line react/prop-types
const Header = ({ brandRef, borderBottom, skipLink, scriptLink, linkId }) => {
  const [showConsentBanner, setShowConsentBanner] = useState(true);

  const handleBannerBlur = event => {
    const isRejectButton =
      event.target.getAttribute('data-terms-banner') === 'reject' ||
      event.target.getAttribute('data-cookie-banner') === 'reject';
    const isAcceptButton =
      event.relatedTarget.getAttribute('data-terms-banner') === 'accept' ||
      event.relatedTarget.getAttribute('data-cookie-banner') === 'accept';
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

const HeaderContainer = ({ scriptSwitchId, renderScriptSwitch }) => {
  const { pageType, isAmp } = useContext(RequestContext);
  const { service, script, translations, dir, scriptLink, lang, serviceLang } =
    useContext(ServiceContext);
  const { skipLinkText } = translations;

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== ARTICLE_PAGE;

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

  const shouldRenderScriptSwitch = scriptLink && renderScriptSwitch;

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
      {showNav && <NavigationContainer />}
    </header>
  );
};

HeaderContainer.propTypes = {
  scriptSwitchId: string,
  renderScriptSwitch: bool,
};

HeaderContainer.defaultProps = {
  scriptSwitchId: '',
  renderScriptSwitch: true,
};

export default HeaderContainer;
