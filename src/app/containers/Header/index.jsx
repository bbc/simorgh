import React, { useContext } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import ScriptLink from './ScriptLink';
import useToggle from '#hooks/useToggle';
import OperaMiniDetection from '#hooks/OperaMiniDetection';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
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
  const borderBottom = pageType !== 'frontPage';

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== 'article';

  const isOperaMini = OperaMiniDetection();

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

  return (
    <header role="banner" lang={serviceLang}>
      <ConsentBanner />
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLink && <ScriptLink />}
      />
      {showNav && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
