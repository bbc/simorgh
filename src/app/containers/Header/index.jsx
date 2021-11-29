import React, { useContext, useRef } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import ScriptLink from './ScriptLink';
import useToggle from '#hooks/useToggle';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

// eslint-disable-next-line react/prop-types
const Header = ({ brandRef, borderBottom, skipLink, scriptLink, linkId }) => {
  // linkId={linkId || 'topPage'} is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
  return (
    <>
      <ConsentBanner onDismissFocusRef={brandRef} />
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLink}
        brandRef={brandRef}
        linkId={linkId || 'topPage'}
      />
    </>
  );
};

const HeaderContainer = () => {
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

  return (
    <header role="banner" lang={serviceLang}>
      {isAmp ? (
        <Header
          linkId="brandLink"
          skipLink={skipLink}
          scriptLink={scriptLink && <ScriptLink />}
        />
      ) : (
        <Header
          brandRef={brandRef}
          skipLink={skipLink}
          scriptLink={scriptLink && <ScriptLink />}
        />
      )}
      {showNav && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
