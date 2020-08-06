import React, { useContext } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import ScriptLink from './ScriptLink';
import useToggle from '#hooks/useToggle';
import onClient from '#lib/utilities/onClient';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const {
    service,
    script,
    translations,
    dir,
    scriptLink,
    lang,
    officialServiceLang,
  } = useContext(ServiceContext);
  const { skipLinkText } = translations;
  const borderBottom = pageType !== 'frontPage';

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== 'article';

  const isOperaMini = onClient() && window.operamini;

  // 'officialServiceLang' value is only available in the Ukrainian config as our ukraine_in_russian pages will have
  // Ukrainian text for the header and footer but Russian text for the main element.
  // However, the skip to content link will also be in Russian, so we need to pass the `ru-UA` lang code to it.
  const headerLangAttribute = officialServiceLang && {
    lang: officialServiceLang,
  };
  const skipLinkLangAttribute = headerLangAttribute && { lang };

  const skipLink = !isOperaMini && (
    <SkipLink
      service={service}
      script={script}
      dir={dir}
      href="#content"
      {...skipLinkLangAttribute}
    >
      {skipLinkText}
    </SkipLink>
  );

  return (
    <header role="banner" {...headerLangAttribute}>
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
