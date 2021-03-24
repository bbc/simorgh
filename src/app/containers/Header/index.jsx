import React, { useContext, useRef } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import AmpHeader from './index.amp';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import ScriptLink from './ScriptLink';
import useToggle from '#hooks/useToggle';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { ARTICLE_PAGE, FRONT_PAGE } from '#app/routes/utils/pageTypes';

const HeaderContainer = () => {
  const { pageType, isAmp } = useContext(RequestContext);
  const {
    service,
    script,
    translations,
    dir,
    scriptLink,
    lang,
    serviceLang,
  } = useContext(ServiceContext);
  const { skipLinkText } = translations;
  const borderBottom = pageType !== FRONT_PAGE;

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
      {skipLinkText}
    </SkipLink>
  );

  if (isAmp) {
    console.log('YEEEEEEET');
  } else {
    console.log('FUUUUUUUUUCK');
  }

  const Header = () => (
    <>
      <ConsentBanner onDismissFocusRef={brandRef} />
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLink && <ScriptLink />}
        brandRef={brandRef}
      />
    </>
  );

  return (
    <header role="banner" lang={serviceLang}>
      {isAmp ? (
        <AmpHeader
          borderBottom={borderBottom}
          skipLink={skipLink}
          scriptLink={scriptLink && <ScriptLink />}
        />
      ) : (
        <Header />
      )}
      {showNav && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
